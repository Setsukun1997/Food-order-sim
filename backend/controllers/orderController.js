const Order = require('../models/Order'); 
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body); 
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

module.exports = { createOrder };
