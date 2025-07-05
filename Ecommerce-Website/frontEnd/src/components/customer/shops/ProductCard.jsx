import { useState } from "react";
import { useCart } from "../../../context/CartContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { VARIATION_PRODUCT_IDS } from "../../../data/variationProducts.js";
import priceFormat from "../../../utils/priceFormat.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEllipsisVertical,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import "../../../styles/customer/component-styles/shops/ProductCard.css";

function ProductCard({
  product,
  showDetails,
  setShowItem,
  setDeletePrompt = () => {},
  showEdit = () => {},
}) {
  const { isLoggedIn, role } = useAuth();
  const { addToCart } = useCart();
  const hasVariation = VARIATION_PRODUCT_IDS.includes(product.id);

  return (
    <div
      key={product.id}
      className="product-card"
      onClick={(event) => {
        if (!event.target.closest(".functions-product")) {
          showDetails(true);
          setShowItem(product);
        }
      }}
    >
      <div className="product-image-holder">
        <img src={product.image} alt={product.name}></img>
      </div>
      <div className="product-description">
        <div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-keywords">
            {product.keywords
              .slice(
                0,
                product.keywords.length > 3 ? 4 : product.keywords.length
              )
              .join(" | ")}
          </p>
        </div>
        <div className="card-functions">
          <h2 className="product-price">${priceFormat(product.priceCents)}</h2>
          {isLoggedIn && role === "customer" && (
            <div className="functions-product customer">
              <FontAwesomeIcon
                icon={faCartShopping}
                size="lg"
                onClick={() => {
                  if (
                    product.keywords.includes("footwear") ||
                    product.keywords.includes("apparel") ||
                    hasVariation
                  ) {
                    showDetails(true);
                    setShowItem(product);
                  } else {
                    addToCart(product);
                  }
                }}
              />
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </div>
          )}
          {isLoggedIn && role === "seller" && (
            <div className="functions-product seller">
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                onClick={() => setDeletePrompt(true)}
              />
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                size="lg"
                onClick={() => showEdit(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
