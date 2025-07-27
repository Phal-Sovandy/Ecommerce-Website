import React, { useCallback, useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";

import CheckOutWindow from "../../components/customer/check-out/CheckOutWindow.jsx";
import CheckOutItem from "../../components/customer/check-out/CheckOutItem.jsx";

import "../../styles/customer/CheckOut.css";

function CheckOut() {
  const { cart, updateItemQuantity, removeFromCart, removeAllFromCart } = useCart();
  
  // Create a wrapper function to ensure the correct parameter order
  const handleUpdateQuantity = useCallback((item, newQuantity) => {
    // The updateItemQuantity function expects (product, newQuantity)
    return updateItemQuantity(item, newQuantity);
  }, [updateItemQuantity]);
  
  // Set document title on component mount
  React.useEffect(() => {
    document.title = "Check Out at Sooner";
  }, []);
  
  // Log cart changes for debugging
  React.useEffect(() => {
    console.log('Cart updated:', cart);
  }, [cart]);

  return (
    <main id="checkout">
      <div className="checkout-items-container">
        <div id="head">
          <h2>Orders Item(s)</h2>
          {cart.length > 0 && (
            <button id="remove-all-btn" onClick={removeAllFromCart}>
              Remove All
            </button>
          )}
        </div>
        {cart.length === 0 ? (
          <h4 style={{ color: "grey" }}>Your cart is empty</h4>
        ) : (
          cart.map((item) => (
            <CheckOutItem
              key={`${item.asin}-${item.option || 'no-option'}`}
              item={item}
              itemChange={handleUpdateQuantity}
              itemRemove={removeFromCart}
            />
          ))
        )}
      </div>
      <CheckOutWindow cart={cart} />
    </main>
  );
}

export default CheckOut;
