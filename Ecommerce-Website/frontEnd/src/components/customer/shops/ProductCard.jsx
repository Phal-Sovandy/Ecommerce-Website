import { useCart } from "../../../context/CartContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getAProductsInfo } from "../../../api/common/products.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEllipsisVertical,
  faHeart,
  faHeart as faHeartSolid,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../../../context/WishlistContext";

import "../../../styles/customer/component-styles/shops/ProductCard.css";

function ProductCard({
  product,
  showDetails,
  setDeletePrompt = () => {},
  showEdit = () => {},
}) {
  const { isLoggedIn, role } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div
      key={product.asin}
      className="product-card"
      onClick={(event) => {
        if (!event.target.closest(".functions-product")) {
          showDetails();
        }
      }}
    >
      <div className="product-image-holder">
        <img
          src={product.image || "../../../assets/OrderCard.png"}
          alt={product.title}
        ></img>
      </div>
      <div className="product-description">
        <div className="product-name">
          <h3>{product.title}</h3>
        </div>
        <div className="bottom-product-card">
          <div className="badge-brand">
            {product.badge && (
              <p
                className={`product-badge ${
                  product.badge?.toLowerCase() === "amazon's  choice"
                    ? "amazon-choice"
                    : product.badge?.toLowerCase() === "#1 best seller"
                    ? "best-seller"
                    : product.badge?.toLowerCase() === "#1 new release"
                    ? "new-release"
                    : ""
                }`}
              >
                {product.badge}
              </p>
            )}
            {product.brand?.trim() && (
              <p className="product-brand">{product.brand}</p>
            )}
          </div>
          <div className="card-functions">
            <h2 className="product-price">
              {product.currency} {product.price}
            </h2>
            {isLoggedIn && role === "customer" && (
              <div className="functions-product customer">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="lg"
                  onClick={async () => {
                    try {
                      const productDetails = await getAProductsInfo(
                        product.asin
                      );
                      if (productDetails?.variations?.length > 0) {
                        showDetails();
                      } else {
                        addToCart({
                          id: product.asin + (product.option ? `-${product.option}` : ""),
                          asin: product.asin,
                          name: product.title,
                          priceCents: product.price, // or product.final_price if that's correct
                          currency: product.currency,
                          image: product.image,
                          option: product.option,
                          // add any other fields needed by the checkout
                        });
                      }
                    } catch (error) {
                      console.error("Error: ", error.message);
                    }
                  }}
                />
                <FontAwesomeIcon
                  icon={wishlist.some(w => w.asin === product.asin) ? faHeartSolid : faHeart}
                  size="lg"
                  style={{ color: wishlist.some(w => w.asin === product.asin) ? 'red' : 'gray', cursor: 'pointer' }}
                  onClick={e => {
                    e.stopPropagation();
                    if (wishlist.some(w => w.asin === product.asin)) {
                      removeFromWishlist(product);
                    } else {
                      addToWishlist(product);
                    }
                  }}
                />
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
    </div>
  );
}
export default ProductCard;
