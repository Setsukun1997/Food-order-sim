import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

export default router;
