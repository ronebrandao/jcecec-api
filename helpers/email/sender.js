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

const sendSubscriptionEmail = async (email, name) => {
  const msg = {
    to: email,
    from: { email: "no-reply@jcecec.com.br", name: "JCECEC" },
    templateId: "d-30b67052625d4becad9c3c5d34e4dfb7",
    dynamic_template_data: {
      name: name
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

const sendProofreadSetEmail = async (email, name, title) => {
  const msg = {
    to: email,
    from: { email: "no-reply@jcecec.com.br", name: "JCECEC" },
    templateId: "d-3a157869661949dc856f5b0617e277cf",
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


const sendProofreadMadeEmail = async (email, fullName, title, message) => {
  const msg = {
    to: email,
    from: { email: "no-reply@jcecec.com.br", name: "JCECEC" },
    templateId: "d-149e273bf8234a849ff6cdc27b744497",
    dynamic_template_data: {
      fullName: fullName,
      title: title,
      message: message ? message : "O revisor não deixou uma mensagem."
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

module.exports = {
  sendSubmissionSentEmail,
  sendSubscriptionEmail,
  sendProofreadSetEmail,
  sendProofreadMadeEmail
};
