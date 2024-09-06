const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "dilipbaghel162@gmail.com",
    pass: "xkoguwfssnnfuhkm",
  },
});

const sendMail = (to, sub, msg) => {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });

  console.log("Email has been sent");
};

module.exports = sendMail;

// xkog uwfs snnf uhkm
