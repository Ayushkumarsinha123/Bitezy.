import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    _id: { type: String, required: true }, 
    dishName: String,
    price: Number,
    restaurantName: String,
    quantity: { type: Number, default: 1 }
  }]
});

export default mongoose.model("Cart", cartSchema);