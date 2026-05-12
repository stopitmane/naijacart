const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// In-memory orders store
const orders = [];

// POST /api/orders — place order (protected)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order.' });
    }
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 50000 ? 0 : 1500;
    const total = subtotal + deliveryFee;

    const order = {
      id: `NC-${uuidv4().slice(0, 8).toUpperCase()}`,
      userId: req.user.id,
      userName: req.user.name,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'Pay on Delivery',
      subtotal,
      deliveryFee,
      total,
      status: 'Confirmed',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    };
    orders.push(order);
    res.status(201).json({
      success: true,
      message: `Order ${order.id} placed successfully! Estimated delivery in 3 days.`,
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not place order. Please try again.' });
  }
});

// GET /api/orders — user's orders (protected)
router.get('/', authMiddleware, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, data: userOrders });
});

// GET /api/orders/:id — single order (protected)
router.get('/:id', authMiddleware, (req, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
  res.json({ success: true, data: order });
});

module.exports = router;
