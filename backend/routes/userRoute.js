const express = require("express");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails}= require('../controllers/userController');
const router = express.Router();
const {isAuthenticatedUser,authorizedRoles}= require('../middleware/auth')
router.route("/register").post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser,getUserDetails);

router.route('/logout').get(logout);
module.exports= router;