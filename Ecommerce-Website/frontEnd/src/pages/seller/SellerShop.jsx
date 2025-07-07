import React, { useState } from "react";
import ProductCard from "../../components/customer/shops/ProductCard";
import ModalInfo from "../../components/common/modals/ModalInfo";
import ProductWindow from "../../components/customer/shops/ProductWindow";
import ProductInfo from "../../components/seller/ProductInfo";

import "../../styles/seller/SellerShop.css";
import "../../styles/seller/ClarifyDelete.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SellerShop = () => {
  const [sureDelete, setSureDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [windowProduct, setWindowProduct] = useState(null);

  const sampleProductInfo = {
    title: "Men's Athletic Sneakers",
    categories: ["footwear"],
    departments: ["men", "sportswear"],
    images: [
      "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
    ],
    image: "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
    rating: 4.5,
    sold: 128,
    model_number: "SNKR-2025-XL",
    brand: "ZoomStep",
    manufacturer: "ZoomStep Inc.",
    weight: "950g",
    dimension: "30 x 18 x 12 cm",
    date_first_available: new Date("2025-06-01T00:00:00Z"),
    variations: ["Red", "Blue", "Black"],
    currency: "$",
    price: 69.99,
    discount: "10% off",
    description:
      "These men's athletic sneakers combine performance and style, featuring breathable mesh and durable soles. Perfect for running, walking, and gym workouts.",
    features: [
      "Breathable mesh upper",
      "Durable rubber sole",
      "Lightweight design",
      "Available in multiple colors",
      "Designed for sports and casual wear",
    ],
    sellerId: "SEL1234",
    seller_name: "Johny Bloke",
    badge: "Amazon's choice",
    root_bs_rank: 123,
    bs_rank: 12,
    subcategory_rank: [
      { subcategory_name: "Automotive", subcategory_rank: 12 },
      { subcategory_name: "Wheel & Repair", subcategory_rank: 120 },
    ],
  };

  return (
    <div className="seller-shop-wrapper">
      <div className="add-new-product" onClick={() => setShowAdd(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <ProductInfo
        show={showAdd}
        onClose={() => setShowAdd(false)}
        add={true}
      />
      <ProductInfo
        show={showEdit}
        onClose={() => setShowEdit(false)}
        productInfo={sampleProductInfo}
        add={false}
      />
      {showWindow ? (
        <ProductWindow
          product={windowProduct}
          setShowState={setShowWindow}
          showEdit={setShowEdit}
        />
      ) : null}
      <ClarifyDelete show={sureDelete} onClose={() => setSureDelete(false)} />
      <header>
        <div className="shop-profile">
          <img src="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg" />
        </div>
        <h1>Jame's Shop</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officiis
          optio veritatis commodi? Expedita maiores autem cum nobis neque
          inventore eveniet praesentium consequuntur eos rerum dicta tempore
          earum perferendis recusandae facere quisquam placeat, corrupti a sunt
          aspernatur? Voluptates earum obcaecati quasi esse iure minima quos
          veniam doloribus mollitia dolores magni nesciunt libero nisi debitis
          facere ipsum reiciendis, corrupti consequuntur. Fuga, ad rem possimus
          ut corporis eos, magni optio eum unde veniam numquam animi vitae culpa
          iure repellendus ipsum at, repudiandae dignissimos! Perspiciatis vel
          alias pariatur deserunt amet velit ex! Dolor consectetur quis
          perferendis laudantium ullam quas harum ea doloribus maxime!
        </p>
      </header>
      <main>
        <div className="products-container">
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProductInfo}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
        </div>
      </main>
    </div>
  );
};

export default SellerShop;

function ClarifyDelete({ show, onClose }) {
  return (
    <ModalInfo show={show} onClose={onClose} head={false}>
      <h2>Are You Sure to delete this product?</h2>
      <div className="clarify-delete-button">
        <button type="button">Yes</button>
        <button type="button" onClick={onClose}>
          No
        </button>
      </div>
    </ModalInfo>
  );
}
