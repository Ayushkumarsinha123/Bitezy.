import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: String, 
  restaurantName: String,
  items: Array, 
  totalAmount: Number,
  status: { type: String, enum: ['Pending', 'Preparing', 'Delivered'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);