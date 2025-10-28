const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String
}, { _id: false }); 



const orderSchema = new mongoose.Schema({
  items: {
    type: [itemSchema],
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'completed'],
    default: 'pending'
  },
  customerName: {
    type: String,
    default: 'Guest'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
