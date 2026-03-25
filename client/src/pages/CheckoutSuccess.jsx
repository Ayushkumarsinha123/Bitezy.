import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@mui/material/Button';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Empty the cart as soon as this page loads!
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate a random fake order number for realism
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-gray-100 transform transition-all hover:scale-[1.01]">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircleOutlineIcon className="text-green-500" sx={{ fontSize: 80 }} />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your payment was successful and the restaurant has started preparing your food.
        </p>

        {/* Order Details Box */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Order Number</p>
          <p className="text-2xl font-bold text-gray-900">#{orderNumber}</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">Estimated Delivery: <span className="font-bold text-gray-900">30 - 45 mins</span></p>
          </div>
        </div>

        {/* Back to Home Button */}
        <Button 
          variant="contained" 
          color="error" 
          size="large" 
          fullWidth
          onClick={() => navigate('/feed')}
          sx={{ borderRadius: "25px", padding: "14px", fontSize: "1.1rem", fontWeight: "bold" }}
          disableElevation
        >
          Keep Browsing Food
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;