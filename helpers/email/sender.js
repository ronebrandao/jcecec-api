const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSubmissionSentEmail = async (email, name, title) => {
  const msg = {
    to: email,
    from: { email: "no-reply@jcecec.com.br", name: "JCECEC" },
    templateId: "d-3a500733e37d4b918213be6489433442",
    dynamic_template_data: {
      name: name,
      title: title
    }
  };

  return new Promise((resolve, reject) => {
    sgMail.send(msg, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

module.exports = sendSubmissionSentEmail;
