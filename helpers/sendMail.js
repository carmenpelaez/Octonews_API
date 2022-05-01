const sendgrid = require("@sendgrid/mail");

/* In the previous version of the function, the parameters os sendmail were an object */
async function sendMail(email, title, content) {
  // Sendrig apy key configuration
  sendgrid.setApiKey(process.env.SENDGRID_KEY);

  // Message configuration
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: title,
    text: content,
    html: `
      <div>
        <h1>${title}</h1>
        <p>${content}</p>
      </div>
    `,
  };

  // Sending message
  await sendgrid.send(message);
}

module.exports = sendMail;
