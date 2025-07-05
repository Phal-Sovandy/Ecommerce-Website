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

  const sampleProduct = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c0",
    image:
      "https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg",
    name: "Men's Athestic Sweater Color Grey",
    rating: {
      stars: 4.5,
      count: 69,
    },
    priceCents: 1680,
    keywords: ["top", "sweater", "shirt", "apparel", "mens"],
    stock: 10,
  };

  const sampleProductInfo = {
  title: "Wireless Bluetooth Headphones",
  description: "Noise-cancelling over-ear headphones with long battery life.",
  model_number: "WBH-100X",
  feature: "Something Blah Blah Blah",
  weight: "250g",
  dimensions: "20 x 18 x 8 cm",
  department: ["technology", "kitchen", "bedroom"],
  variations: ["FJDDFDE:black", "FLENEFEF:blue", "FNELENFLE:red"],
  parent_asin: "B09XKXY1R9,B09XKXY1S1",
  input_asin: "B09XKXY2T2,B09XKXY3T3",
  state: "Battery, Plastic, Circuit Board",
  date_first_available: new Date("2024-08-15"),
};


  return (
    <div className="seller-shop-wrapper">
      <div className="add-new-product" onClick={() => setShowAdd(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <ProductInfo show={showAdd} onClose={() => setShowAdd(false)} add={true}/>
      <ProductInfo show={showEdit} onClose={() => setShowEdit(false)} productInfo={sampleProductInfo} add={false}/>
      {showWindow ? (
        <ProductWindow product={windowProduct} setShowState={setShowWindow} />
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
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
            setDeletePrompt={setSureDelete}
            showEdit={setShowEdit}
            showDetails={setShowWindow}
            setShowItem={setWindowProduct}
          />
          <ProductCard
            product={sampleProduct}
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
