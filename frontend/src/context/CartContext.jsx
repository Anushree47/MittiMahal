'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // Load user and merge guest cart on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

    if (user?._id) {
      setUserId(user._id);

      if (guestCart.length > 0) {
        mergeGuestCart(guestCart);
        localStorage.removeItem('guestCart');
      }
    }
  }, []);

  // Fetch cart when userId is set
  useEffect(() => {
    if (userId) fetchCartDetails();
  }, [userId]);

  const fetchCartDetails = async () => {
    if (!userId) return;

    try {
      const res = await axiosInstance.get(`/cart/${userId}`);
      setCart(res.data.items || []);
    } catch (err) {
      console.error('❌ Error fetching cart:', err.message);
    }
  };

   const addToCart = async (product, quantity = 1) => {
    const productId = product._id;

    if (!userId) {
      // Guest user logic
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      const existingIndex = guestCart.findIndex(item => item.productId === productId);

      if (existingIndex !== -1) {
        toast('Already in guest cart');
        return;
      }

      guestCart.push({ productId, quantity });
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      toast.success('Added to guest cart');
      return;
    }

    // Logged-in user logic
    setCart(prev => {
      const index = prev.findIndex(item => item.productId._id === productId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      }
      return [...prev, { productId: product, quantity }];
    });

    try {
      await axiosInstance.post('/cart/add', { userId, productId, quantity });
      toast.success('Added to cart');
      fetchCartDetails();
    } catch (err) {
      toast.error('Failed to add to cart');
      console.error('❌ Cart add error:', err.message);
    }
  };
 
  
  const updateCartItem = async (productId, quantity) => {
    try {
      await axiosInstance.put('/cart/update', { userId, productId, quantity });
      toast.success('Cart updated');
      fetchCartDetails();
    } catch (err) {
      toast.error('Error updating cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete('/cart/remove', { data: { userId, productId } });
      toast.success('Item removed');
      fetchCartDetails();
    } catch (err) {
      toast.error('Error removing item');
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete('/cart/clear', { data: { userId } });
      toast.success('Cart cleared');
      setCart([]);
    } catch (err) {
      toast.error('Error clearing cart');
    }
  };

  const mergeGuestCart = async (guestCart = []) => {
    if (!guestCart.length || !userId) return;

    try {
      await axiosInstance.post('/cart/merge', { userId, guestCart });
      toast.success('Guest cart merged');
      fetchCartDetails();
    } catch (err) {
      console.error('❌ Error merging cart:', err.message);
      toast.error('Failed to merge guest cart');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCartDetails,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        mergeGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default useCartContext;
