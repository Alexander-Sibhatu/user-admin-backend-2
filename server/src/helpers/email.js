const dev = require('../config');
const nodemailer = require('nodemailer');

sendEmailWithNodeMailer = async (emailData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, //true for 465, false for other ports
      auth: {
        user: dev.smtpUsername, //generated ethereal user
        pass: dev.smtpPassword, // generated ethereal password
      },
    });

    const mailOptions = {
      from: dev.smtpUsername, // sender's address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    // send mail with defined transport object
   await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: %s", info.response);
      }
    });
  } catch (error) {
    console.log('Error occurred while sending Email: ', error);
    throw error; // Propagate the error up to the caller
  }
};

module.exports = {sendEmailWithNodeMailer}