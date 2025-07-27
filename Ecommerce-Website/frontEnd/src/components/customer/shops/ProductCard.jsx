import { useState } from "react";
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
  faSpinner,
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
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
                  product.badge?.toLowerCase() === "amazon's choice" ||
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
          </div>
          <div className="card-functions">
            <h2 className="product-price">
              {product.currency} {product.price}
            </h2>
            {isLoggedIn && role === "customer" && (
              <div className="functions-product customer">
                <FontAwesomeIcon
                  icon={isAddingToCart ? faSpinner : faCartShopping}
                  size="lg"
                  spin={isAddingToCart}
                  className={isAddingToCart ? 'cart-loading' : ''}
                  onClick={async (e) => {
                    e.stopPropagation(); // Prevent the card click handler from triggering
                    if (isAddingToCart) return; // Prevent multiple clicks
                    
                    try {
                      setIsAddingToCart(true);
                      
                      // If product has variations, show details page
                      if (product.hasVariations) {
                        showDetails();
                        return;
                      }
                      
                      // Otherwise, add to cart directly
                      const result = await addToCart({
                        asin: product.asin,
                        title: product.title,
                        price: parseFloat(product.price) || 0,
                        currency: product.currency || '$',
                        image: product.image,
                        option: product.option,
                        quantity: 1 // Default quantity to 1
                      });
                      
                      if (result.success) {
                        // Show success message (you might want to use a toast notification here)
                        console.log('Added to cart:', result.message);
                      } else {
                        console.error('Failed to add to cart:', result.error);
                        // You might want to show an error message to the user
                      }
                    } catch (error) {
                      console.error("Error adding to cart:", error);
                    } finally {
                      setIsAddingToCart(false);
                    }
                  }}
                />
                <div 
                  className="wishlist-button"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (isWishlistLoading) return;
                    
                    const isInWishlist = wishlist.some((w) => w.asin === product.asin);
                    console.log(`Wishlist button clicked for product: ${product.asin}, isInWishlist: ${isInWishlist}`);
                    
                    try {
                      setIsWishlistLoading(true);
                      
                      if (isInWishlist) {
                        console.log('Removing product from wishlist');
                        await removeFromWishlist(product);
                        console.log('Successfully removed from wishlist');
                      } else {
                        console.log('Adding product to wishlist');
                        const result = await addToWishlist(product);
                        console.log('addToWishlist result:', result);
                      }
                    } catch (error) {
                      console.error('Error in wishlist operation:', error);
                    } finally {
                      setIsWishlistLoading(false);
                    }
                  }}
                  style={{ cursor: isWishlistLoading ? 'not-allowed' : 'pointer' }}
                >
                  {isWishlistLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="lg" color="gray" />
                  ) : (
                    <FontAwesomeIcon
                      icon={wishlist.some((w) => w.asin === product.asin) ? faHeartSolid : faHeart}
                      size="lg"
                      color={wishlist.some((w) => w.asin === product.asin) ? 'red' : 'gray'}
                    />
                  )}
                </div>
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
