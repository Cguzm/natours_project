const express = require('express');

const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Registration and login
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Password reset
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect middleware (protect all routes after this middleware)
router.use(authController.protect);

// Password update
router.patch('/updateMyPassword', authController.updatePassword);

// Get current user
router.get('/me', userController.getMe, userController.getUser);

// Update current user
router.patch('/updateMe', userController.updateMe);
// Delete current user
router.delete('/deleteMe', userController.deleteMe);

// Restrict middleware (restrict all routes after this middleware)
router.use(authController.restrictTo('admin'));

// Get all users, create user, get user, update user and delete user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
