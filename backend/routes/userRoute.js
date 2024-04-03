const express = require("express");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile,getALLUser}= require('../controllers/userController');
const router = express.Router();
const {isAuthenticatedUser,authorizedRoles}= require('../middleware/auth')
router.route("/register").post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/logout').get(logout);
router.route('/me/update').put(isAuthenticatedUser,updateProfile);
router.route('/admin/users').get(isAuthenticatedUser,authorizedRoles("admin"),getALLUser);
module.exports= router;