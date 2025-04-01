import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/component-styles/shops/ImageSlider.css";

// Product that have variations, load image slider.
function ImageSlider({ images, selectedImageIndex }) {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    setCurrentIndex(selectedImageIndex);
  }, [selectedImageIndex]);

  return (
    <div className="image-slider">
      <button type="button" className="prev-button" onClick={prevImage}>
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
      </button>
      <img
        className="variation-images"
        src={images[currentIndex]}
        alt={`Product variation ${currentIndex + 1}`}
      />
      <button type="button" className="next-button" onClick={nextImage}>
        <FontAwesomeIcon icon={faArrowRight} size="2xl" />
      </button>
    </div>
  );
}

export default ImageSlider;
