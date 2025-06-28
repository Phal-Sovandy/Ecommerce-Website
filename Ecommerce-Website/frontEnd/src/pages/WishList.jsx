import React from "react";
import WishListItem from "../components/wishlist/WishListItem";
import "../styles/WishList.css";

const WishList = () => {
  const sampleItem = {
    asin: "1233234",
    title: "Hello this is the product",
    final_price: 1323.233,
    currency: "USD",
    categories: ["Sport", "Kitchen", "Bedroom"],
    image_url:
      "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    availability: "Only 10 in stock",
  };
  return (
    <main id="wishlist">
      <div id="head">
        <h2>Wishlist Item(s)</h2>
        <button id="remove-all-btn" onClick={() => {}}>
          Remove All
        </button>
      </div>

      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />
      <WishListItem product={sampleItem} />

    </main>
  );
};

export default WishList;
