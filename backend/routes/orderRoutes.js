const express = require('express');
const { createOrder, getOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/order', getOrder);

module.exports = router;
