import express from 'express';
import Order from '../models/Order.js';
import { verfyToken  } fron '../middleware/auth.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken async (req, res) => {
  try {
    const { items, total, timestamp } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'ไม่พบรายการอาหาร!' });
    }

    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ error: 'ยอดรวมไม่ถูกต้อง!' });
    }

    const order = new Order({ items, total, timestamp });
    await order.save();

    res.status(201).json({
      message: '✅ บันทึกคำสั่งซื้อสำเร็จ',
      orderId: order._id,
      createdAt: order.timestamp
    });
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์!' });
  }
});

router.get('/', verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ timestamp: -1 });
    res.json(orders);
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดในการดึงคำสั่งซื้อ:', err);
    res.status(500).json({ error: 'ไม่สามารถดึงคำสั่งซื้อได้!' });
  }
});

export default router;