const mongoose = require('mongoose');

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

module.exports = mongoose.model('Cart', cartSchema);