import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  timestamp: Date,
  status: { type: String, default: 'รอรับออเดอร์' } 
});
  createdAt: { type: Date, default: () => Date.now() }
});

export default mongoose.model('Order', orderSchema);
