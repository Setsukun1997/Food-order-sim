import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ items: req.body });
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
