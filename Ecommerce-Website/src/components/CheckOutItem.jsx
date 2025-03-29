import React, { useState } from "react";
import "../styles/component-styles/CheckOutItem.css";

function CheckOutItem({ item, itemChange, itemRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);

  function handleAddItem() {
    if (quantity < item.stock) {
      setQuantity((q) => q + 1);
      itemChange({ id: item.id, quantity: quantity + 1 });
    }
  }
  function handleTakeOutItem() {
    if (quantity > 0) {
      setQuantity((q) => q - 1);
      itemChange({ id: item.id, quantity: quantity - 1 });
    }
  }

  return (
    <div className="checkout-item" key={item.id}>
      <div className="item-image">
        <img src={item.image} alt={item.name}></img>
      </div>
      <div className="item-details">
        <h2>{item.name}</h2>
        <p className="product-keywords">
          {item.keywords
            .slice(0, item.keywords.length > 3 ? 4 : item.keywords.length)
            .join(" | ")}
        </p>
        <div className="item-quantity-set">
          <button className="takeOutItem" onClick={handleTakeOutItem}>
            -
          </button>
          <span className="itemQuantity">{quantity}</span>
          <button className="addItem" onClick={handleAddItem}>
            +
          </button>
        </div>
        <button className="item-rm" onClick={() => itemRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CheckOutItem;
