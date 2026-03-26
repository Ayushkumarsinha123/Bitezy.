
import Cart from '../models/Cart.js'; 
import Order from '../models/Order.js';



// 1. Get the user's saved cart when they log in
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customer: req.user.id });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// 2. Sync the cart (This handles ADDING, UPDATING, and DELETING all at once!)
export const syncCart = async (req, res) => {
  try {
    const { items } = req.body;
    
    // Find the cart and overwrite the items array. Upsert creates it if it doesn't exist.
    const cart = await Cart.findOneAndUpdate(
      { customer: req.user.id },
      { items: items },
      { new: true, upsert: true }
    );
    
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Failed to sync cart to database" });
  }
};


// 3. Create a new order when they click Checkout
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // Create the order
    const newOrder = new Order({
      customer: req.user.id,
      customerName: req.user.name,
      restaurantName: items[0].restaurantName, 
      items,
      totalAmount
    });
    
    await newOrder.save();

    // CLEAR the cart in the database now that they checked out!
    await Cart.findOneAndUpdate({ customer: req.user.id }, { items: [] });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

// 4. Restaurant Dashboard: Fetch incoming orders
export const fetchRestaurantOrders = async (req, res) => {
  try {
    // Find all orders where the restaurantName matches the logged-in restaurant owner
    console.log("Dashboard is asking for orders belonging to:", req.user.name);
    
    const orders = await Order.find({ restaurantName: req.user.name }).sort({ createdAt: -1 });
    
    console.log("Found this many orders:", orders.length);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch restaurant orders" });
  }
};

// 5. Update Status (Pending -> Preparing -> Delivered)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};