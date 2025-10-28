const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
app.use('/api/auth', require('./routes/auth')); // เดิม
app.use('/api/orders', require('./routes/orders')); // ✅ เพิ่ม route สำหรับออเดอร์
app.get('/', (req, res) => {
  res.send('🍽️ Food-order backend is running!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
