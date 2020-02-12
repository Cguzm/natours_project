/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_9e36vjED7wmctRwSTw0lGRGF00xoTFeAYg');

export const bookTour = async tourId => {
  try {
    // 1)  Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
