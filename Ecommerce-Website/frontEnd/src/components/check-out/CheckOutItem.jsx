import React, { useState } from "react";
import priceFormat from "../../utils/priceFormat.js";
import "../../styles/component-styles/check-out/CheckOutItem.css";

function CheckOutItem({ item, itemChange, itemRemove }) {
  const [quantity, setQuantity] = useState(Math.min(item.quantity, item.stock));

  function handleAddItem() {
    if (quantity < item.stock) {
      setQuantity((q) => q + 1);
      itemChange({ ...item, quantity: quantity + 1 });
    }
  }
  function handleTakeOutItem() {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
      itemChange({ ...item, quantity: quantity - 1 });
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
        <h4>${priceFormat(item.priceCents * item.quantity)}</h4>
        {item.size ? <div className="product-size">{item.size}</div> : null}
        {item.option ? (
          <div className="product-option">{item.option}</div>
        ) : null}
        <div className="item-quantity-set">
          <button
            className={`takeOutItem ${quantity <= 1 ? "disabled-btn" : ""}`}
            onClick={handleTakeOutItem}
          >
            -
          </button>
          <span className="itemQuantity">{quantity}</span>
          <button
            className={`addItem ${
              quantity >= item.stock ? "disabled-btn" : ""
            }`}
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
