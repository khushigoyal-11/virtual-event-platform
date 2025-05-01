exports.sendEmail = async ({ to, subject, message }) => {
    // TODO: Integrate with SendGrid or another email service.
    console.log(`Sending email to ${to} with subject "${subject}"`);
  };
  
  exports.sendPush = async ({ to, title, body }) => {
    // TODO: Integrate with Firebase Cloud Messaging or OneSignal.
    console.log(`Sending push notification to ${to} with title "${title}"`);
  };
  