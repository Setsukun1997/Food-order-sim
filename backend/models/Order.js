import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: {
    type: [String],
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: () => new Date()
  },
  status: {
    type: String,
    default: 'รอรับออเดอร์'
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
});

export default mongoose.model('Order', orderSchema);