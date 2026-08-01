import nodemailer from "nodemailer";

let transporter;

// SendGrid's SMTP relay, so no extra SDK is needed. The username is the
// literal string "apikey"; the password is the API key itself.
const getTransporter = () => {
  if (!process.env.MAILER_API_KEY) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.MAILER_API_KEY,
      },
    });
  }
  return transporter;
};

/**
 * Best-effort transactional email. Every call site sends the HTTP response to
 * the client *before* mailing, so a mailer failure must never escape - an
 * unhandled rejection after res.json() poisons the serverless invocation.
 */
const sendMail = async (message) => {
  const t = getTransporter();
  if (!t) {
    console.warn("MAILER_API_KEY not set - skipping email:", message.subject);
    return false;
  }
  try {
    await t.sendMail({ from: process.env.MAIL_FROM, ...message });
    return true;
  } catch (err) {
    console.error(`Email failed ("${message.subject}"):`, err.message);
    return false;
  }
};

export default sendMail;
