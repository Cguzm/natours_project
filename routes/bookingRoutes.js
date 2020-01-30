const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

// Implement the routes using the CRUD functionality.

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBookingCheckout);

router
  .route('/:id')
  .get(bookingController.getBooking) // Read
  .patch(bookingController.updateBooking) // Update
  .delete(bookingController.deleteBooking); // Delete

module.exports = router;
