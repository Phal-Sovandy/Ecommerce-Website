import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { 
  getWishlist, 
  addToWishlist as addToWishlistAPI, 
  removeFromWishlist as removeFromWishlistAPI,
  clearWishlist as clearWishlistAPI
} from "../api/wishlistApi";
import { useAuth } from "./AuthContext";

// Debug function to log auth state changes
function useAuthDebug() {
  const auth = useAuth();
  useEffect(() => {
    console.log('Auth state changed:', {
      isLoggedIn: auth.isLoggedIn,
      id: auth.id,
      role: auth.role,
      token: auth.token ? 'Token exists' : 'No token'
    });
  }, [auth]);
  return auth;
}

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the debug hook to track auth changes
  const auth = useAuthDebug();
  
  // Log when auth changes
  useEffect(() => {
    console.log('WishlistProvider - Auth state:', {
      isLoggedIn: auth.isLoggedIn,
      userId: auth.id,
      role: auth.role
    });
  }, [auth]);

  // Load wishlist from backend when component mounts or user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      console.log('Fetching wishlist - Auth state:', {
        isLoggedIn: auth.isLoggedIn,
        userId: auth.id,
        role: auth.role
      });
      
      if (!auth.isLoggedIn || !auth.id) {
        console.log('User not logged in or no user ID, skipping wishlist fetch');
        setWishlist([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching wishlist for user ID:', auth.id);
        const data = await getWishlist(auth.id);
        console.log('Fetched wishlist data:', data);
        // Transform the backend response to match our frontend format
        const formattedWishlist = data.wishlistItems?.map(item => ({
          ...item.product,
          option: item.option // Include any option data if available
        })) || [];
        console.log('Formatted wishlist:', formattedWishlist);
        setWishlist(formattedWishlist);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch wishlist:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError("Failed to load wishlist");
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [auth.isLoggedIn, auth.id]);

  const checkProductExistence = useCallback((wishlistIn, product) => {
    return wishlistIn.some(
      (item) => item.asin === product.asin
    );
  }, []);

  const addToWishlist = useCallback(async (product) => {
    console.log('addToWishlist called with product:', product);
    console.log('Current auth state:', {
      isLoggedIn: auth.isLoggedIn,
      userId: auth.id,
      role: auth.role
    });
    
    if (!auth.isLoggedIn || !auth.id) {
      console.error('User not logged in or no user ID. User must be logged in to add to wishlist');
      setError("Please log in to add items to your wishlist");
      return false;
    }

    console.log('Current user id:', auth.id);
    
    // First, check if the product is already in the wishlist
    const alreadyInWishlist = checkProductExistence(wishlist, product);
    console.log('Product already in wishlist?', alreadyInWishlist);
    
    if (alreadyInWishlist) {
      console.log('Product already in wishlist, not adding again');
      return { success: true, alreadyExists: true };
    }

    // Store the current wishlist for potential rollback
    const previousWishlist = [...wishlist];
    
    try {
      // Optimistic UI update - only if not already in wishlist
      console.log('Performing optimistic UI update');
      setWishlist(prev => [...prev, product]);
      
      // Make the API call
      console.log('Calling addToWishlistAPI with:', {
        customerId: auth.id, 
        productAsin: product.asin
      });
      
      const result = await addToWishlistAPI(auth.id, product.asin);
      console.log('API Response:', result);
      
      if (result.alreadyExists) {
        // If the server says it already exists, but we don't have it locally,
        // we need to refresh the wishlist to stay in sync
        if (!checkProductExistence(wishlist, product)) {
          console.log('Server reports item already in wishlist, refreshing...');
          const data = await getWishlist(auth.id);
          const formattedWishlist = data.wishlistItems?.map(item => ({
            ...item.product,
            option: item.option
          })) || [];
          setWishlist(formattedWishlist);
        }
        return { success: true, alreadyExists: true };
      }
      
      return { success: true, alreadyExists: false };
    } catch (err) {
      console.error("Error in addToWishlist:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
        response: err.response?.data,
        status: err.response?.status,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          data: err.config?.data,
          headers: err.config?.headers
        }
      });
      setError(`Failed to add item to wishlist: ${err.message}`);
      // Revert optimistic update on error
      setWishlist(prev => prev.filter(item => item.asin !== product.asin));
      return false;
    }
  }, [auth, wishlist, checkProductExistence]);

  const removeFromWishlist = async (product) => {
    if (!auth.isLoggedIn || !auth.id) {
      setError("Please log in to modify your wishlist");
      return false;
    }

    try {
      // Optimistic UI update
      setWishlist(prev => prev.filter(item => item.asin !== product.asin));
      
      await removeFromWishlistAPI(auth.id, product.asin);
      return true;
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      setError("Failed to remove item from wishlist");
      // Re-fetch wishlist to ensure consistency
      if (user?.customer_id) {
        const data = await getWishlist(user.customer_id);
        const formattedWishlist = data.wishlistItems?.map(item => ({
          ...item.product,
          option: item.option
        })) || [];
        setWishlist(formattedWishlist);
      }
      return false;
    }
  };

  const removeAllFromWishlist = async () => {
    if (!auth.isLoggedIn || !auth.id) {
      setError("Please log in to modify your wishlist");
      return false;
    }

    try {
      // Optimistic UI update
      setWishlist([]);
      
      await clearWishlistAPI(auth.id);
      return true;
    } catch (err) {
      console.error("Error clearing wishlist:", err);
      setError("Failed to clear wishlist");
      // Re-fetch wishlist to ensure consistency
      if (auth.isLoggedIn && auth.id) {
        const data = await getWishlist(auth.id);
        const formattedWishlist = data.wishlistItems?.map(item => ({
          ...item.product,
          option: item.option
        })) || [];
        setWishlist(formattedWishlist);
      }
      return false;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        removeAllFromWishlist,
        isInWishlist: (product) => checkProductExistence(wishlist, product),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
