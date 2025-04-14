import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create order
router.post('/', async (req, res) => {
    try {
        const order = new Order({
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            items: req.body.items.map(item => ({
                productId: item._id,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: req.body.totalAmount
        });

        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
