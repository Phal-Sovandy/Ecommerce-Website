import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((c) => {
      const existingItem = c.find((item) => item.id === product.id);
      if (existingItem) {
        return c.map((item) => {
          if (item.id === product.id) {
            return item.quantity < item.stock
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          } else {
            return item;
          }
        });
      }
      return [...c, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((c) => c.filter((item) => item.id !== productId));
  }

  function removeAllFromCart() {
    setCart([]);
  }

  function updateItemQuantity(newOrder) {
    setCart((c) =>
      c.map((order) =>
        order.id === newOrder.id
          ? { ...order, quantity: newOrder.quantity }
          : order
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
