import { useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";

import CheckOutWindow from "../components/check-out/CheckOutWindow.jsx";
import CheckOutItem from "../components/check-out/CheckOutItem.jsx";

import "../styles/CheckOut.css";

function CheckOut() {
  const { cart, updateItemQuantity, removeFromCart, removeAllFromCart } =
    useCart();
  useEffect(() => {
    document.title = "Check Out at Sooner";
  }, []);
  return (
    <main id="checkout">
      <div className="checkout-items-container">
        <div id="head">
          <h2>Orders Item(s)</h2>
          <button id="remove-all-btn" onClick={removeAllFromCart}>
            Remove All
          </button>
        </div>
        {cart.length === 0 ? (
          <h4 style={{ color: "grey" }}>Your cart is empty</h4>
        ) : (
          cart.map((order) => (
            <CheckOutItem
              key={order.id}
              item={order}
              itemChange={updateItemQuantity}
              itemRemove={removeFromCart}
            />
          ))
        )}
      </div>
      <CheckOutWindow></CheckOutWindow>
    </main>
  );
}
export default CheckOut;
