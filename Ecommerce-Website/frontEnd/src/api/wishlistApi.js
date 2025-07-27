import axiosInstance from '../utils/axiosInstance';

// Get wishlist for the current user
export const getWishlist = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/wishlists/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add product to wishlist
export const addToWishlist = async (customerId, productAsin) => {
  console.log('addToWishlist called with:', { customerId, productAsin });
  try {
    const response = await axiosInstance.post(
      `/wishlists/${customerId}/products`,
      { asin: productAsin }
    );
    console.log('addToWishlist success:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    // Handle 409 Conflict (product already in wishlist)
    if (error.response?.status === 409) {
      console.log('Product already in wishlist');
      return { 
        success: true, 
        alreadyExists: true,
        message: 'Product is already in your wishlist' 
      };
    }
    
    console.error('Error adding to wishlist:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Re-throw the error for other cases
    throw error;
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (customerId, productAsin) => {
  try {
    const response = await axiosInstance.delete(
      `/wishlists/${customerId}/products/${productAsin}`
    );
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Clear entire wishlist
export const clearWishlist = async (customerId) => {
  try {
    const response = await axiosInstance.delete(`/wishlists/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    throw error;
  }
};
