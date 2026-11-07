// const sgMail = require("@sendgrid/mail")
// const NEW_SIGNIN_URL = process.env.NEW_SIGNIN_URL
// const RESET_PASSWORD = process.env.RESET_PASSWORD
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// exports.sendUserRegistrationMail = async (emailId, username, tempPassword) => {
//   // console.log(`sending user registration email to user: ${username}`)
//   const pwdResetLink = `${NEW_SIGNIN_URL}?name=${username}&pass=${tempPassword}`
//   // console.log(`pwdResetLink: ${pwdResetLink}`)
//   const msg = {
//     to: emailId, // Change to your recipient
//     from: "hr@sukalpatechsolutions.com", // Change to your verified sender
//     subject: "user registration confirmation",
//     text: "reset password and login",
//     html: `click <a href="${pwdResetLink}">here</a> to reset password and login`,
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       // console.log(`user registration mail email sent to user: ${emailId}`)
//       return true
//     })
//     .catch((error) => {
//       console.error(error)
//       return false
//     })
// }

// exports.sendForgotPasswordMail = async (emailId, username, tempPassword) => {
//   // console.log(`sending new password email to user: ${username}`)
//   const forgotPwdLink = `${RESET_PASSWORD}?name=${username}&pass=${tempPassword}`
//   // console.log(`forgotPwdLink: ${forgotPwdLink}`)
//   const msg = {
//     to: emailId, // Change to your recipient
//     from: "hr@sukalpatechsolutions.com", // Change to your verified sender
//     subject: "Your new password to login",
//     text: "Here is your new password to Login. Also, you can use the below link to login back to the site.",
//     html: `click <a href="${forgotPwdLink}">here</a> to reset password and login`,
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       // console.log(`Forgot password email sent to user: ${emailId}`)
//       return true
//     })
//     .catch((error) => {
//       console.error(error)
//       return false
//     })
// }

const nodemailer = require("nodemailer");

const NEW_SIGNIN_URL = process.env.NEW_SIGNIN_URL;
const RESET_PASSWORD = process.env.RESET_PASSWORD;

// ===================== Nodemailer Transport =====================
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || "mail.pulsework.in",
//   port: Number(process.env.SMTP_PORT) || 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER || "info@sukalpatech.com",
//     pass: process.env.SMTP_PASS || "SukalpaTech@2024",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, //use false port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("✅ SMTP Server is Ready");
    console.log(success);
  }
});

// ===================== User Registration Mail =====================
exports.sendUserRegistrationMail = async (emailId, username, tempPassword) => {
  try {
    console.log(`sending user registration email to user: ${username}`);
    const pwdResetLink = `${NEW_SIGNIN_URL}?name=${username}&pass=${tempPassword}`;
    console.log(`pwdResetLink: ${pwdResetLink}`);

    const mailOptions = {
      from: `"SUKALPA TECH SOLUTIONS" <${process.env.SMTP_USER}>`,
      to: emailId,
      subject: "User registration confirmation",
      text: `Reset password and login: ${pwdResetLink}`,
      html: `Click <a href="${pwdResetLink}" style="color:#007bff;">here</a> to reset password and login`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ User registration email sent to user: ${emailId}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending registration email:", error);
    return false;
  }
};

// ===================== Forgot Password Mail =====================
exports.sendForgotPasswordMail = async (emailId, username, tempPassword) => {
  try {
    console.log(`sending new password email to user: ${username}`);
    const forgotPwdLink = `${RESET_PASSWORD}?name=${username}&pass=${tempPassword}`;
    console.log(`forgotPwdLink: ${forgotPwdLink}`);

    const mailOptions = {
      from: `"SUKALPA TECH SOLUTIONS" <${process.env.SMTP_USER}>`,
      to: emailId,
      subject: "Your new password to login",
      text: `Here is your new password to login: ${forgotPwdLink}`,
      html: `Click <a href="${forgotPwdLink}" style="color:#007bff;">here</a> to reset password and login`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Forgot password email sent to user: ${emailId}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending forgot password email:", error);
    return false;
  }
};