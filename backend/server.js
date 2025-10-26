import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import menuRoutes from './routes/menu.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/food-order-sim';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('✅ Food-order-sim backend is running!');
});

app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});