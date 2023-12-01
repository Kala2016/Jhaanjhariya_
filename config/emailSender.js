const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "kalartisko@gmail.com",
      pass: "zvxd ebqd ojed iuyf",
    }
});

module.exports=transporter;