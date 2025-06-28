import React from "react";
import "../../styles/component-styles/wishlist/WishListItem.css";

const WishListItem = ({ product }) => {
  return (
    <div className="wishlist-item" key={product.asin}>
      <div className="item-image">
        <img src={product.image_url} alt={product.title}></img>
      </div>
      <div className="item-details">
        <h2>{product.title}</h2>
        <p className="product-categories">
          {product.categories
            .slice(
              0,
              product.categories.length > 3 ? 4 : product.categories.length
            )
            .join(" | ")}
        </p>
        <p className="product-availability">{product.availability}</p>
        <h4>
          ${product.final_price} {product.currency}
        </h4>
      </div>
      <div className="button-wrapper">
        <button
          className="item-add"
          onClick={() => addItemToCart(customer.customer_id, product.asin)}
        >
          Add to Cart
        </button>
        <button
          className="item-rm"
          onClick={() => removeFromWishlist(customer.customer_id, product.asin)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishListItem;
