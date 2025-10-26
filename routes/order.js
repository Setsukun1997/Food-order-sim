import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { items, total } = req.body;
  const order = new Order({ items, total });
  await order.save();
  res.json({ message: 'Order received', order });
});

export default router;
