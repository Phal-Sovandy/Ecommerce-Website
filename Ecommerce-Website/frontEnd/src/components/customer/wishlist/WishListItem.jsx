import React from "react";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import "../../../styles/customer/component-styles/wishlist/WishListItem.css";

const WishListItem = ({ product }) => {
  const { cart, addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const inCart = cart.some(
    (item) => item.asin === product.asin && (!product.option || product.option === item.option)
  );
  return (
    <div className="wishlist-item" key={product.asin}>
      <div className="item-image">
        <img src={product.image || product.image_url} alt={product.title}></img>
      </div>
      <div className="item-details">
        <h2>{product.title}</h2>
        <p className="product-categories">
          {product.categories && product.categories.length > 0
            ? product.categories
                .slice(0, product.categories.length > 3 ? 4 : product.categories.length)
                .join(" | ")
            : null}
        </p>
        {product.availability && (
          <p className="product-availability">{product.availability}</p>
        )}
        <h4>
          ${product.price || product.final_price} {product.currency}
        </h4>
      </div>
      <div className="button-wrapper">
        <button
          className="item-add"
          onClick={() => {
            addToCart({
              id: (product.asin || product.id) + (product.option ? `-${product.option.asin || product.option}` : ""),
              asin: product.asin || product.id,
              name: product.title || product.name,
              priceCents: product.price || product.final_price,
              currency: product.currency,
              image: product.image || product.image_url,
              option: product.option,
              // Add any other fields needed for checkout/cart
            });
          }}
          disabled={inCart}
        >
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
        <button
          className="item-rm"
          onClick={() => removeFromWishlist(product)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishListItem;
