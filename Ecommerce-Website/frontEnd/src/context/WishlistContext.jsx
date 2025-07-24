import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function checkProductExistence(wishlistIn, product) {
    return wishlistIn.find(
      (item) =>
        item.asin === product.asin &&
        (!product.option?.asin || product.option?.asin === item.option?.asin)
    );
  }

  function addToWishlist(product) {
    setWishlist((w) => {
      if (checkProductExistence(w, product)) {
        return w;
      } else {
        return [...w, product];
      }
    });
  }

  function removeFromWishlist(product) {
    setWishlist((w) => w.filter((item) => item.asin !== product.asin || (product.option?.asin && item.option?.asin !== product.option.asin)));
  }

  function removeAllFromWishlist() {
    setWishlist([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        removeAllFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
