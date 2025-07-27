import axiosInstance from '../utils/axiosInstance';

// Add product to cart
export const addToCart = async (customerId, productData) => {
  try {
    console.log('Sending add to cart request with:', { customerId, productData });
    const response = await axiosInstance.post('/orders/cart/add', {
      customer_id: customerId,
      asin: productData.asin,
      quantity: productData.quantity || 1,
      option: productData.option || null
    });
    console.log('Add to cart successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding to cart:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    throw error;
  }
};

// Get cart items for a customer
export const getCart = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/orders/cart/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (customerId, productData) => {
  try {
    const response = await axiosInstance.delete('/orders/cart/remove', {
      data: {
        customer_id: customerId,
        asin: productData.asin,
        option: productData.option || null
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async (customerId) => {
  try {
    const response = await axiosInstance.delete('/orders/cart/clear', {
      data: { customer_id: customerId }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (customerId, productData) => {
  try {
    console.log('Updating cart item quantity:', { customerId, productData });
    
    // First remove the item
    const removeResponse = await removeFromCart(customerId, productData);
    console.log('Remove from cart response:', removeResponse);
    
    // Then add it back with the new quantity if quantity > 0
    if (productData.quantity > 0) {
      console.log('Adding item back with new quantity:', productData.quantity);
      const addResponse = await addToCart(customerId, {
        ...productData,
        quantity: productData.quantity
      });
      console.log('Add to cart response:', addResponse);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating cart item quantity:', {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    throw error;
  }
};
