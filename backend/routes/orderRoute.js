const express = require('express');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const { newOrder, myOrders, getSingleOrder, deleteOrder, getAllOrders, updateOrder } = require('../controllers/orderController');
const { getALLUser } = require('../controllers/userController');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route('/order/me').get(isAuthenticatedUser,myOrders)
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
router.route('/admin/orders').get(isAuthenticatedUser,authorizedRoles("admin"),getAllOrders)
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizedRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder)
module.exports = router;
