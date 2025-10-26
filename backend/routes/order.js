import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { items, total, timestamp } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'ไม่มีรายการอาหารในคำสั่งซื้อ' });
    }

    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ error: 'ยอดรวมไม่ถูกต้อง' });
    }

    const order = new Order({ items, total, timestamp });
    await order.save();

    res.status(201).json({
      message: '✅ บันทึกคำสั่งซื้อสำเร็จ',
      orderId: order._id,
      createdAt: order.timestamp
    });
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
  }
});

export default router;