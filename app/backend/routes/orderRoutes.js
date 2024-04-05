import express from 'express';
import {
    addOrderItems, 
    getOrderById, 
    updateOrderPaid, 
    getOrderByUser, 
    getOrders,
    updateOrderDelivered,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorder').get(protect, getOrderByUser)
router.route('/:id/pay').put(protect, updateOrderPaid)
router.route('/:id/deliver').put(protect, updateOrderDelivered)
router.route('/:id').get(protect, getOrderById)
router.route('/:id').get(protect, getOrderById)

export default router
