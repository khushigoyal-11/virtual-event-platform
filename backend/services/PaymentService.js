exports.createPaymentSession = async ({ amount, eventId }) => {
    // TODO: Integrate with Stripe/PayPal here.
    return { sessionId: 'dummy-session-id', amount, eventId };
  };
  