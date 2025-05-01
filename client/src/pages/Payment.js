import React from 'react';
import axios from 'axios';

const Payment = ({ eventName, ticketPrice, quantity }) => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/payments/create-order', {
        eventName,
        ticketPrice,
        quantity
      });

      const options = {
        key: "your_razorpay_key_id", // Replace with your public key
        amount: data.amount,
        currency: data.currency,
        name: eventName,
        description: "Ticket Purchase",
        order_id: data.orderId,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <button onClick={handlePayment}>Pay Now</button>
  );
};

export default Payment;
