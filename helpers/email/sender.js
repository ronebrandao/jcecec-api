const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendSubmissionSentEmail = async (email, name, title) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Submissão",
    html: `Olá ${name}, 
    <br/>
    <br/>
    A submissão do trabalho <b>${title}</b> foi realizada com sucesso.
    <br/>
    <br/>
    O trabalho será analisado e em breve entraremos em contato.`
  });

  return info.messageId != undefined;
};

module.exports = sendSubmissionSentEmail;
