import { useCart } from "../context/CartContext";
import { VARIATION_PRODUCT_IDS } from "../data/variationProducts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

import "../styles/component-styles/ProductCard.css";
import priceFormat from "../utils/priceFormat.js";

function ProductCard({ product, showDetails, setShowItem }) {
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
          <div className="functions-product">
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
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
