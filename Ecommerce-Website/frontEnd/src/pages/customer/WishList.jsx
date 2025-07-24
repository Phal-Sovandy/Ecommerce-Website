import React from "react";
import WishListItem from "../../components/customer/wishlist/WishListItem";
import { useWishlist } from "../../context/WishlistContext";
import "../../styles/customer/WishList.css";

const WishList = () => {
  const { wishlist, removeAllFromWishlist } = useWishlist();

  return (
    <main id="wishlist">
      <div id="head">
        <h2>Wishlist Item(s)</h2>
        <button id="remove-all-btn" onClick={removeAllFromWishlist} disabled={wishlist.length === 0}>
          Remove All
        </button>
      </div>
      {wishlist.length === 0 ? (
        <h4 style={{ color: "grey" }}>Your wishlist is empty</h4>
      ) : (
        wishlist.map((product) => (
          <WishListItem key={product.id || product.asin} product={product} />
        ))
      )}
    </main>
  );
};

export default WishList;
