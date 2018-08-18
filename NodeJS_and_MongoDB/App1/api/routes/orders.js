const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.createOrder);

router.get('/:orderID', checkAuth, OrdersController.orders_get_order);

router.get('/remove/:orderID', checkAuth, OrdersController.orders_delete_order);

module.exports = router;