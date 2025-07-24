import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function checkProductExistance(cartIn, product) {
    return cartIn.find(
      (item) =>
        item.asin === product.asin &&
        (!product.option?.asin || product.option?.asin === item.option?.asin)
    );
  }
  function addToCart(product) {
    setCart((c) => {
      const existingItem = checkProductExistance(c, product);
      if (existingItem) {
        return c.map((item) => {
          if (
            item.asin === product.asin &&
            (!product.option?.asin ||
              product.option?.asin === item.option?.asin)
          ) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        return [...c, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(product) {
    setCart((c) =>
      c.filter((item) => item.id !== product.id)
    );
  }

  function removeAllFromCart() {
    setCart([]);
  }

  function updateItemQuantity(newOrder) {
    setCart((c) =>
      c.map((item) =>
        item.id === newOrder.id
          ? {
              ...item,
              quantity: item.stock
                ? Math.min(newOrder.quantity, item.stock)
                : newOrder.quantity,
            }
          : item
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        removeAllFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
