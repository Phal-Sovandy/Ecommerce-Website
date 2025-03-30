import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.jsx";

import priceFormat from "../../utils/priceFormat.js";
import ImageSlider from "./ImageSlider.jsx";

import {
  VARIATION_PRODUCTS,
  VARIATION_PRODUCT_IDS,
} from "../../data/variationProducts.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import topSizeChart from "../../assets/top-size-chart.png";
import bottomSizeChart from "../../assets/bottom-size-chart.webp";
import shoesSizeChart from "../../assets/shoes-size-chart.webp";

import "../../styles/component-styles/shops/ProductWindow.css";


function ProductWindow({ product, setShowState }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [option, setOption] = useState(null);
  const [selectedImageIndex, setSelectedIndex] = useState(0);
  const hasVariation = VARIATION_PRODUCT_IDS.includes(product.id);

  const productId = VARIATION_PRODUCTS.findIndex(
    (vProduct) => vProduct.id === product.id
  );
  const productDetalis = VARIATION_PRODUCTS[productId];

  function imageSizeChart() {
    if (product.keywords.includes("top")) {
      return <img src={topSizeChart} alt="top wear size chart" />;
    } else if (product.keywords.includes("bottom")) {
      return <img src={bottomSizeChart} alt="bottom wear size chart" />;
    } else if (product.keywords.includes("footwear")) {
      return <img src={shoesSizeChart} alt="shoes size chart" />;
    } else {
      return null;
    }
  }
  function handleVariationProductsImage() {
    let variationProduct = VARIATION_PRODUCTS.find(
      (vProduct) => vProduct.id === product.id
    );
    if (variationProduct) {
      const images = variationProduct.images;
      return (
        <ImageSlider images={images} selectedImageIndex={selectedImageIndex} />
      );
    }
    return (
      <img className="product-images" src={product.image} alt="product image" />
    );
  }
  function handleProductOptions() {
    let variationProduct = VARIATION_PRODUCTS.find(
      (vProduct) => vProduct.id === product.id
    );
    if (variationProduct) {
      return (
        <div className="selection choice">
          <h4>Choice Selections</h4>
          <div className="selection-container">
            {variationProduct.selection.map((optionItem, index) => (
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
      );
    }
    return null;
  }
  function handleApparelSize() {
    return product.keywords.includes("apparel") ? (
      <div className="selection size">
        <h4>Size Selections</h4>
        <div className="selection-container">
          {[
            "XX-Small",
            "X-Small",
            "Small",
            "Medium",
            "Large",
            "X-Large",
            "XX-Large",
          ].map((sizing) => (
            <div
              key={sizing}
              className={sizing === size ? "selected" : ""}
              onClick={() => setSize(sizing)}
            >
              {sizing}
            </div>
          ))}
        </div>
      </div>
    ) : null;
  }
  function handleShoesSize() {
    return product.keywords.includes("footwear") ? (
      <div className="selection shoes-size">
        <h4>Size Selections</h4>
        <div className="selection-container">
          {["44", "45", "48", "50", "52", "55", "57"].map((sizing) => (
            <div
              key={sizing}
              className={sizing === size ? "selected" : ""}
              onClick={() => setSize(sizing)}
            >
              {sizing}
            </div>
          ))}
        </div>
      </div>
    ) : null;
  }
  function handleAddToCart() {
    if (product.keywords.includes("apparel")) {
      if (!size) {
        window.alert("Please select a size");
        return false;
      }
      if (hasVariation && !option) {
        window.alert("Please select an option");
        return false;
      }
    } else if (product.keywords.includes("footwear")) {
      if (!size) {
        window.alert("Please select a size");
        return false;
      }
      if (hasVariation && !option) {
        window.alert("Please select an option");
        return false;
      }
    } else {
      if (hasVariation && !option) {
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
        image: hasVariation
          ? productDetalis.images[selectedImageIndex]
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

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="overlay">
      <form className="product-window" onSubmit={handleSubmission}>
        <div className="head">
          <FontAwesomeIcon icon={faMinus} onClick={() => setShowState(false)} />
        </div>
        <div className="bottom">
          <div className="image-holder">{handleVariationProductsImage()}</div>
          <div className="item-details">
            <div className="top">
              <div className="product-title">
                <h2>{product.name}</h2>
                <p className="product-keywords">
                  {product.keywords.join(" | ")}
                </p>
                <div className="product-rating">
                  <img
                    src={`../../public/ratings/rating-${
                      product.rating.stars * 10
                    }.png`}
                    alt="rating"
                  ></img>
                  <p>
                    {product.rating.stars} <span>({product.rating.count})</span>
                  </p>
                </div>
              </div>
              <button className="addToCart-btn" type="submit">
                Add to Cart
              </button>
            </div>
            <div className="price">${priceFormat(product.priceCents)}</div>

            {/*Size selection for apparel (eg. shirts, pants,...)*/}
            {handleApparelSize()}

            {/*Shoes Size selection for shoes*/}
            {handleShoesSize()}

            {/*Options for products with variations*/}
            {handleProductOptions()}

            {product.keywords.includes("apparel") ||
            product.keywords.includes("footwear") ? (
              <div className="size-chart-container">
                <h4>Size Guide</h4>
                <div className="chart-holder">{imageSizeChart()}</div>
              </div>
            ) : null}

            <div className="product-descriptions">
              <h4>Description</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                ducimus nostrum maxime illum nesciunt deserunt quaerat obcaecati
                labore exercitationem commodi molestias a ipsa quam libero?
                Sequi libero consectetur debitis iure perspiciatis voluptas
                quasi quisquam, autem possimus natus hic qui ullam dolorum velit
                soluta accusantium atque expedita corrupti? Voluptate eos porro
                animi fugit molestias totam eaque sit aliquid ab pariatur, optio
                consequatur nemo, deserunt incidunt enim saepe. Illum veniam
                excepturi ut. Quaerat repellendus eveniet impedit? Alias tempore
                et nobis, laudantium suscipit consequatur quidem, ducimus odio
                facilis quas libero iusto. Id perferendis eveniet culpa atque
                aliquam tenetur ullam voluptatibus cumque totam sed!
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductWindow;
