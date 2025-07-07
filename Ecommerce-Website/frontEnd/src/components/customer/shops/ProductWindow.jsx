import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

import ImageSlider from "./ImageSlider.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faMinus,
  faPaperPlane,
  faStar,
  faTrash,
  faWebAwesome,
} from "@fortawesome/free-solid-svg-icons";

import topSizeChart from "../../../assets/top-size-chart.png";
import bottomSizeChart from "../../../assets/bottom-size-chart.webp";
import shoesSizeChart from "../../../assets/shoes-size-chart.webp";

import "../../../styles/customer/component-styles/shops/ProductWindow.css";
import { Link } from "react-router-dom";

// Load product details.
function ProductWindow({ product, setShowState, showEdit = () => {} }) {
  const { isLoggedIn, role } = useAuth();
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [option, setOption] = useState(null);
  const [selectedImageIndex, setSelectedIndex] = useState(0);

  function imageSizeChart() {
    if (product.categories.includes("top")) {
      return <img src={topSizeChart} alt="top wear size chart" />;
    } else if (product.categories.includes("bottom")) {
      return <img src={bottomSizeChart} alt="bottom wear size chart" />;
    } else if (product.categories.includes("footwear")) {
      return <img src={shoesSizeChart} alt="shoes size chart" />;
    } else {
      return null;
    }
  }
  // function handleApparelSize() {
  //   return product.categories.includes("apparel") ? (
  //     <div className="selection size">
  //       <h4>Size Selections</h4>
  //       <div className="selection-container">
  //         {[
  //           "XX-Small",
  //           "X-Small",
  //           "Small",
  //           "Medium",
  //           "Large",
  //           "X-Large",
  //           "XX-Large",
  //         ].map((sizing) => (
  //           <div
  //             key={sizing}
  //             className={sizing === size ? "selected" : ""}
  //             onClick={() => setSize(sizing)}
  //           >
  //             {sizing}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   ) : null;
  // }
  // function handleShoesSize() {
  //   return product.categories.includes("footwear") ? (
  //     <div className="selection shoes-size">
  //       <h4>Size Selections</h4>
  //       <div className="selection-container">
  //         {["44", "45", "48", "50", "52", "55", "57"].map((sizing) => (
  //           <div
  //             key={sizing}
  //             className={sizing === size ? "selected" : ""}
  //             onClick={() => setSize(sizing)}
  //           >
  //             {sizing}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   ) : null;

  function handleAddToCart() {
    if (product.categories.includes("apparel")) {
      if (!size) {
        window.alert("Please select a size");
        return false;
      }
      if (product.variations && !option) {
        window.alert("Please select an option");
        return false;
      }
    } else if (product.categories.includes("footwear")) {
      if (!size) {
        window.alert("Please select a size");
        return false;
      }
      if (product.variations && !option) {
        window.alert("Please select an option");
        return false;
      }
    } else {
      if (product.variations && !option) {
        window.alert("Please select an option");
        return false;
      }
    }
    return true;
  }
  function handleSubmission(event) {
    event.preventDefault();
    if (handleAddToCart()) {
      addToCart({
        ...product,
        image: product.variations
          ? product.images[selectedImageIndex]
          : product.image,
        size: size,
        option: option,
      });
      setShowState(false);
    }
  }

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.classList.contains("overlay")) {
        setShowState(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [setShowState]);

  return (
    <div className="overlay">
      <form className="product-window" onSubmit={handleSubmission}>
        <div className="head">
          <FontAwesomeIcon icon={faMinus} onClick={() => setShowState(false)} />
        </div>
        <div className="bottom">
          <div className="image-holder">
            {product.images ? (
              <ImageSlider
                images={product.images}
                selectedImageIndex={selectedImageIndex}
              />
            ) : (
              <img
                className="product-images"
                src={product.image}
                alt="product image"
              />
            )}
          </div>

          <div className="item-details">
            <div className="top">
              <div className="product-title">
                <h2>{product.title}</h2>
                <p className="product-categories">
                  {product.categories.join(" | ")}
                </p>
                <p className="product-departments">
                  {product.departments.join(" | ")}
                </p>
                <div className="product-rating">
                  <img
                    src={`../../public/ratings/rating-${
                      product.rating * 10
                    }.png`}
                    alt="rating"
                  ></img>
                  <p>
                    {product.rating} <span>({product.sold})</span>
                  </p>
                </div>
                <p>
                  Sell By{" "}
                  <span>
                    {`(${product.sellerId})`}{" "}
                    <Link to={`/sellerShop/${product.sellerId}`}>
                      {product.seller_name}
                    </Link>
                  </span>
                </p>
              </div>
              {isLoggedIn && (
                <>
                  {role === "customer" && (
                    <button className="addToCart-btn" type="submit">
                      Add to Cart
                    </button>
                  )}
                  {role === "seller" && (
                    <button
                      className="editProduct-btn"
                      type="button"
                      onClick={() => showEdit(true)}
                    >
                      Edit Product Info
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="price">
              {product.currency} {product.price}{" "}
              {product.discount ? `(${product.discount})` : null}
            </div>

            {/* 
            //Size selection for apparel (eg. shirts, pants,...)
            {handleApparelSize()}

            //Shoes Size selection for shoes
            {/* {handleShoesSize()}
            */}

            {/*Options for products with variations*/}
            <div className="selection choice">
              <h4>Choice Selections</h4>
              <div className="selection-container">
                {product.variations.map((optionItem, index) => (
                  <div
                    key={optionItem}
                    className={optionItem === option ? "selected" : ""}
                    onClick={() => {
                      setOption(optionItem);
                      setSelectedIndex(index);
                    }}
                  >
                    {optionItem}
                  </div>
                ))}
              </div>
            </div>

            <div className="product-details">
              <h4>Details</h4>
              <div className="product-source">
                {product.badge && (
                  <p className="product-badge">
                    {product.badge}{" "}
                    <span>
                      {" "}
                      {product.badge.toLowerCase() === "amazon's choice" ? (
                        <FontAwesomeIcon icon={faMedal} />
                      ) : product.badge.toLowerCase() === "best seller" ? (
                        <FontAwesomeIcon icon={faWebAwesome} />
                      ) : null}
                    </span>
                  </p>
                )}
                <p>
                  {product.availability}
                </p>
                <p>
                  Rank in all category <span>{product.root_bs_rank}</span>
                </p>
                {product.bs_rank && (
                  <p>
                    Best Selling Rank <span>{product.bs_rank}</span>
                  </p>
                )}
                {product.subcategory_rank &&
                  product.subcategory_rank.map((category) => (
                    <p>
                      Rank in {category.subcategory_name}
                      <span> {category.subcategory_rank}</span>
                    </p>
                  ))}
                <p>
                  Model Number <span>{product.model_number}</span>
                </p>
                <p>
                  Brand <span>{product.brand}</span>
                </p>
                <p>
                  Manufacturer <span>{product.manufacturer}</span>
                </p>
                {product.wieght && (
                  <p>
                    Weight <span>{product.weight}</span>
                  </p>
                )}
                <p>
                  Dimension <span>{product.dimension}</span>
                </p>
                {product.ingredients && (
                  <p>
                    Ingredients <span>{product.ingredients}</span>
                  </p>
                )}
                <p>
                  Date first available{" "}
                  <span>{product.date_first_available.toLocaleString()}</span>
                </p>
              </div>
            </div>

            {product.categories.includes("apparel") ||
            product.categories.includes("footwear") ? (
              <div className="size-chart-container">
                <h4>Size Guide</h4>
                <div className="chart-holder">{imageSizeChart()}</div>
              </div>
            ) : null}

            <div className="product-descriptions">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
            <div className="product-features">
              <h4>Features</h4>
              <ul>
                {product.features.map((feature) => (
                  <li>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-reviews-container">
              <h4>Review(s)</h4>

              {/* //TODO: The Top review first */}
              <ProductReview
                userProfile="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
                username="John Cena"
                title="Something is something and thing is not a thing good."
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
        consequuntur perferendis eum fugit quibusdam ipsam earum eos quae
        deleniti accusamus!"
                reviewId={1}
                pin={true}
              />

              {/* //TODO: The rest reviews, just map it*/}
              <ProductReview
                userProfile="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
                username="The Rock"
                title="Something good not good bad yes not good best yes go."
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
        consequuntur perferendis eum fugit quibusdam ipsam earum eos quae
        deleniti accusamus!"
                reviewId={1}
              />
              <ProductReview
                userProfile="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
                username="Sting"
                title="Wow hello amazing wonderful good man women bad worst"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
        consequuntur perferendis eum fugit quibusdam ipsam earum eos quae
        deleniti accusamus!"
                reviewId={1}
              />

              {/* //NOTE: Only the customer who have bought this product can give the review, so modify it*/}
              {role === "customer" && (
                <form className="add-comment">
                  <input
                    type="text"
                    placeholder="What's your thought about this product?"
                  />
                  <button className="post-comment" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductWindow;

function ProductReview({
  userProfile,
  username,
  title,
  description,
  reviewId,
  pin = false,
}) {
  const { role } = useAuth();
  return (
    <div
      className={pin ? `product-review pin` : `product-review`}
      key={`review-${reviewId}`}
    >
      <div className="header">
        <div className="review-info">
          <div className="profile-image">
            <img src={userProfile} />
          </div>
          <h2>{username}</h2>
        </div>
        {role === "seller" && (
          <div className="review-action">
            <div className="pin-review">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="delete-review">
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
