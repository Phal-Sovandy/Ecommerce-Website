import React, { useState } from "react";
import "../../../styles/customer/component-styles/check-out/CheckOutItem.css";

function CheckOutItem({ item, itemChange, itemRemove }) {
  function handleAddItem() {
    if (item.quantity < (item.stock ?? Infinity)) {
      itemChange({ ...item, quantity: item.quantity + 1 });
    }
  }

  function handleTakeOutItem() {
    if (item.quantity > 1) {
      itemChange({ ...item, quantity: item.quantity - 1 });
    }
  }

  // Safe keyword handling
  const keywords = Array.isArray(item.keywords) ? item.keywords : [];

  return (
    <div className="checkout-item" key={item.id}>
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h2>{item.name}</h2>
        <p className="product-keywords">
          {keywords
            .slice(0, keywords.length > 3 ? 4 : keywords.length)
            .join(" | ")}
        </p>
        <h4>${item.priceCents * item.quantity}</h4>
        {item.size ? <div className="product-size">{item.size}</div> : null}
        {item.option ? <div className="product-option">{item.option}</div> : null}
        <div className="item-quantity-set">
          <button
            className={`takeOutItem ${item.quantity <= 1 ? "disabled-btn" : ""}`}
            onClick={handleTakeOutItem}
          >
            -
          </button>
          <span className="itemQuantity">{item.quantity}</span>
          <button
            className={`addItem ${item.quantity >= item.stock ? "disabled-btn" : ""}`}
            onClick={handleAddItem}
          >
            +
          </button>
        </div>
        <button className="item-rm" onClick={() => itemRemove(item)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CheckOutItem;
