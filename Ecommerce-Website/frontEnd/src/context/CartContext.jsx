import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  addToCart as addToCartAPI, 
  removeFromCart as removeFromCartAPI, 
  clearCart as clearCartAPI, 
  getCart as getCartAPI,
  updateCartItemQuantity as updateCartItemQuantityAPI
} from '../api/cartApi';

// Create context
const CartContext = createContext();

// Create provider
export function CartProvider({ children }) {
  const { isLoggedIn, id: userId } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart when user logs in
  const loadCart = useCallback(async () => {
    console.log('loadCart called with isLoggedIn:', isLoggedIn, 'userId:', userId);
    
    if (!isLoggedIn || !userId) {
      console.log('User not logged in, clearing cart');
      setCart([]);
      return [];
    }

    try {
      console.log('Fetching cart for user:', userId);
      setIsLoading(true);
      setError(null);
      
      const response = await getCartAPI(userId);
      console.log('Raw cart API response:', response);
      
      // Map the backend response to match the frontend cart item structure
      const items = (response.items || []).map(item => {
        // If the item already has a product property (from the backend), use that
        const productData = item.product || {};
        
        return {
          id: item.id || item.asin, // Use the ordered item ID or fall back to ASIN
          asin: item.asin,
          quantity: item.quantity || 1,
          option: item.option || null,
          
          // Map product details
          name: productData.title || 'Product name not available',
          priceCents: productData.price || 0,
          image: productData.image_url || 'https://via.placeholder.com/150',
          stock: productData.stock_quantity || 0,
          keywords: productData.keywords || [],
          
          // Include the full product data in case it's needed
          product: productData
        };
      });
      
      console.log('Processed cart items:', items);
      setCart(items);
      
      return items; // Return the processed items
      
    } catch (err) {
      const errorMsg = 'Failed to load cart';
      console.error(errorMsg, {
        error: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack
      });
      setError(errorMsg);
      setCart([]); // Reset cart on error
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, userId]);

  // Load cart on mount and when dependencies change
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Add item to cart
  const addToCart = useCallback(async (product) => {
    console.log('addToCart called with product:', product);
    
    if (!isLoggedIn || !userId) {
      const errorMsg = 'Please log in to add items to cart';
      console.error('User not logged in');
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!product?.asin) {
      const errorMsg = 'Invalid product: Missing required ASIN';
      console.error('Invalid product data:', product);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Calling addToCartAPI with:', {
        userId,
        product: {
          asin: product.asin,
          quantity: product.quantity || 1,
          option: product.option || null
        }
      });
      
      // Pass userId as first parameter and product data as second parameter
      const response = await addToCartAPI(userId, {
        asin: product.asin,
        quantity: product.quantity || 1,
        option: product.option || null
      });
      
      console.log('addToCartAPI response:', response);
      
      // Refresh cart from server
      console.log('Refreshing cart...');
      await loadCart();
      
      console.log('Cart after refresh:', cart);
      
      return { 
        success: true, 
        data: response.data,
        message: 'Item added to cart successfully!' 
      };
      
    } catch (error) {
      const serverError = error.response?.data?.error || error.response?.data?.message;
      const errorMsg = serverError || 'Failed to add item to cart. Please try again.';
      
      console.error('Failed to add to cart:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        request: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        },
        stack: error.stack
      });
      
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg,
        details: error.response?.data || error.message
      };
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, userId, loadCart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (product) => {
    if (!isLoggedIn || !userId) {
      const errorMsg = 'Please log in to modify cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!product?.asin) {
      const errorMsg = 'Invalid product: Missing required ASIN';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      setIsLoading(true);
      await removeFromCartAPI(userId, {
        asin: product.asin,
        option: product.option || null
      });
      
      // Refresh cart
      await loadCart();
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to remove item from cart';
      console.error('Failed to remove from cart:', errorMsg);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, userId, loadCart]);

  // Update item quantity in cart
  const updateItemQuantity = useCallback(async (product, newQuantity) => {
    if (!isLoggedIn || !userId) {
      const errorMsg = 'Please log in to update cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (!product?.asin) {
      const errorMsg = 'Invalid product: Missing required ASIN';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      setIsLoading(true);
      await updateCartItemQuantityAPI(userId, {
        asin: product.asin,
        quantity: newQuantity,
        option: product.option || null
      });
      
      // Refresh cart
      await loadCart();
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update item quantity';
      console.error('Failed to update cart item quantity:', errorMsg);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, userId, loadCart]);

  // Clear all items from cart
  const removeAllFromCart = useCallback(async () => {
    if (!isLoggedIn || !userId) {
      const errorMsg = 'Please log in to clear cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      setIsLoading(true);
      await clearCartAPI(userId);
      setCart([]);
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to clear cart';
      console.error('Failed to clear cart:', errorMsg);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, userId]);

  // Clear error message
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const contextValue = {
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    removeAllFromCart,
    clearError
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
