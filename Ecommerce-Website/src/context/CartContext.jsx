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
        item.id === product.id &&
        (!product.size || product.size === item.size) &&
        (!product.option || product.option === item.option)
    );
  }
  function addToCart(product) {
    if(product.stock <= 0){
      window.alert("Product is out of stock, Please select another product.");
      return
    }
    setCart((c) => {
      const existingItem = checkProductExistance(c, product);

      if (product.stock > 0) {
        if (existingItem) {
          return c.map((item) => {
            if (
              item.id === product.id &&
              (!product.size || product.size === item.size) &&
              (!product.option || product.option === item.option)
            ) {
              return {
                ...item,
                quantity:
                  item.quantity < item.stock
                    ? item.quantity + 1
                    : item.quantity,
              };
            }
            return item;
          });
        } else {
          return [...c, { ...product, quantity: 1 }];
        }
      }
      return c;
    });
  }

  function removeFromCart(product) {
    setCart((c) =>
      c.filter(
        (item) =>
          !(
            item.id === product.id &&
            (!product.size || product.size === item.size) &&
            (!product.option || product.option === item.option)
          )
      )
    );
  }

  function removeAllFromCart() {
    setCart([]);
  }

  function updateItemQuantity(newOrder) {
    setCart((c) =>
      c.map((item) =>
        item.id === newOrder.id &&
        (!newOrder.size || newOrder.size === item.size) &&
        (!newOrder.option || newOrder.option === item.option)
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
