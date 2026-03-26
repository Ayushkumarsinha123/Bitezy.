import express from 'express';
import { 
  getCart, 
  syncCart, 
  createOrder, 
  fetchRestaurantOrders, 
  updateOrderStatus 
} from '../controllers/shopController.js';

import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// GET /api/shop/cart - Fetch the logged-in user's cart
router.get('/cart', protect, getCart);

// PUT /api/shop/cart - Sync (add/remove/update) the cart in the database
router.put('/cart', protect, syncCart);

// POST /api/shop/order - Checkout and create a new order
router.post('/order', protect, createOrder)

// GET /api/shop/orders/restaurant - Fetch all incoming orders for the logged-in restaurant
router.get('/orders/restaurant', protect, fetchRestaurantOrders);

// PUT /api/shop/orders/:id/status - Update an order's status (Pending -> Preparing -> Delivered)
router.put('/orders/:id/status', protect, updateOrderStatus);

export default router;
