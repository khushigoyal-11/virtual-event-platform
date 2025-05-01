// client/src/pages/TicketPurchase.js
import React from 'react';
import API from '../services/api';

const TicketPurchase = () => {
  const handlePayment = async () => {
    try {
      // Create an order from your backend. For example, Rs. 500:
      const orderResponse = await API.post('/razorpay/create-order', {
        amount: 500, // INR 500
      });
      const order = orderResponse.data;

      // Options for Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // your test key id from .env
        amount: order.amount, // in paise
        currency: order.currency,
        name: 'Virtual Event Platform',
        description: 'Test Transaction',
        order_id: order.id, // Order ID created by Razorpay backend
        handler: function (response) {
          console.log("Payment Successful:", response);
          alert('Payment Successful!');
          // Here, you can call your backend to verify the payment,
          // update the ticket status, etc.
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      // Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Payment failed, please try again.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ticket Purchase</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default TicketPurchase;
