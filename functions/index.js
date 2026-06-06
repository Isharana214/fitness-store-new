const { onUserCreated } = require("firebase-functions/v2/identity");
const nodemailer = require("nodemailer");

// તમારું Gmail સેટઅપ
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com", // અહીં તમારું Gmail આઈડી લખો
    pass: "nrqj avok fuok hhae"     // અહીં તમારો 'App Password' લખો
  }
});

exports.sendWelcomeEmail = onUserCreated((event) => {
  const user = event.data;
  const email = user.email;

  const mailOptions = {
    from: "HealthFit Team <noreply@healthfit.com>",
    to: email,
    subject: "Welcome to HealthFit!",
    text: "અમારી એપમાં જોડાવા બદલ આભાર! અમે તમને મદદ કરવા માટે તૈયાર છીએ."
  };

  return transporter.sendMail(mailOptions);
});