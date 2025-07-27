import React, { useState, useEffect } from "react";
import "../../../styles/customer/component-styles/check-out/CheckOutItem.css";

function CheckOutItem({ item, itemChange, itemRemove }) {
  // Ensure we have the product data
  const product = item.product || {};
  
  // Calculate price in dollars
  const price = parseFloat(product.price || 0);
  const totalPrice = (price * item.quantity).toFixed(2);
  
  // Get the first image URL or use a placeholder
  const imageUrl = product.image_url || 'https://placehold.co/300x300?text=No+Image';
  
  // Handle quantity changes
  const handleAddItem = () => {
    if (item.quantity < (product.stock_quantity || Infinity)) {
      itemChange(item, item.quantity + 1);
    }
  };

  const handleTakeOutItem = () => {
    if (item.quantity > 1) {
      itemChange(item, item.quantity - 1);
    }
  };

  // Handle remove item
  const handleRemoveItem = () => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      itemRemove(item);
    }
  };

  // Safe keyword handling
  const keywords = Array.isArray(product.keywords) ? product.keywords : [];

  return (
    <div className="checkout-item" key={`${item.asin}-${item.option || 'no-option'}`}>
      <div className="item-image">
        <img 
          src={imageUrl} 
          alt={product.title || 'Product image'} 
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if placeholder also fails
            e.target.src = 'https://placehold.co/300x300?text=No+Image';
          }}
        />
      </div>
      <div className="item-details">
        <h2>{product.title || 'Product'}</h2>
        {keywords.length > 0 && (
          <p className="product-keywords">
            {keywords.slice(0, Math.min(4, keywords.length)).join(" | ")}
          </p>
        )}
        <h4>${totalPrice}</h4>
        {item.option && <div className="product-option">Option: {item.option}</div>}
        
        <div className="item-quantity-set">
          <button
            className={`takeOutItem ${item.quantity <= 1 ? "disabled-btn" : ""}`}
            onClick={handleTakeOutItem}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="itemQuantity">{item.quantity}</span>
          <button
            className={`addItem ${item.quantity >= (product.stock_quantity || Infinity) ? "disabled-btn" : ""}`}
            onClick={handleAddItem}
            disabled={item.quantity >= (product.stock_quantity || Infinity)}
          >
            +
          </button>
        </div>
        
        <button 
          className="item-rm" 
          onClick={handleRemoveItem}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CheckOutItem;
