import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchCart, syncCart, createOrder } from '../services/shopService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useAuth();

  // 1. Load the database cart when a customer logs in
  useEffect(() => {
    const loadDbCart = async () => {
      if (user && token && user.role === 'customer') {
        try {
          const savedCart = await fetchCart(token);
          setCart(savedCart);
        } catch (err) {
          console.error("Failed to load cart from DB", err);
        }
      } else {
        setCart([]); // Clear cart if logged out or if it's a restaurant
      }
    };
    loadDbCart();
  }, [user, token]);

  // 2. Add Item (Updates React UI + MongoDB instantly)
  const addToCart = async (dish) => {
    let newCart;
    const existingItem = cart.find((item) => item._id === dish._id);
    
    if (existingItem) {
      newCart = cart.map((item) =>
        item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...dish, quantity: 1 }];
    }
    
    setCart(newCart);
    if (token) await syncCart(newCart, token);
  };

  // 3. Remove Item
  const removeFromCart = async (dishId) => {
    const newCart = cart.filter((item) => item._id !== dishId);
    setCart(newCart);
    if (token) await syncCart(newCart, token);
  };

  const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getItemCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  // 4. Checkout Logic
  const handleCheckout = async () => {
    if (!token || cart.length === 0) return false;
    
    try {
      const orderData = {
        items: cart,
        totalAmount: getCartTotal()
      };
      
      await createOrder(orderData, token); // Saves order to DB and clears DB cart
      setCart([]); // Clears the React UI cart
      return true; // Returns true so we know to navigate to the success page!
    } catch (err) {
      console.error("Checkout failed", err);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, getCartTotal, getItemCount, handleCheckout 
    }}>
      {children}
    </CartContext.Provider>
  );
};