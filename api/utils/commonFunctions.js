import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pkg from 'jsonwebtoken';
// import rateLimit from "express-rate-limit"


dotenv.config();

const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.PORTAL_EMAIL,
    pass: process.env.PORTAL_PASSWORD,
  },
};




export const generateForgotPassEmail = async (mail, link) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: mail,
    subject: 'Forgot Password',
    html: `<h2>Password Reset Request</h2>
<p>Hello,</p>
<p>We received a request to reset your password for your account.</p>
<p>Please click the button below to reset your password. This link will expire in 10 minutes.</p>
<a href="${link}" style="
    display: inline-block;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
">Reset Password</a>
<p>Thank you,<br>Your App Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return `OTP sent to ${mail} via email`;
  } catch (error) {
    throw `Error sending OTP to ${mail} via email: ${error}`;
  }
}

export const generateEmail = async (mail, otp) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: mail,
    subject: 'OTP Verification',
    html: `<h2>OTP Verification</h2>
      <p>Hello,</p>
      <p>Your OTP code is:</p>
      <h1 style="color: #4CAF50;">${otp}</h1>
      p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
      <p>Thank you,<br>Your App Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return `OTP sent to ${mail} via email`;
  } catch (error) {
    throw `Error sending OTP to ${mail} via email: ${error}`;
  }
}




const { sign, verify } = pkg;

// const jwtSecretKey = "123456";

export const GenerateToken = ({ data, expiresIn }) => {
  //make the key more harder
  //expires in should also be from .env file
  //good approach
  return sign({ result: data }, process.env.JWT, {
    expiresIn: expiresIn
  })
};

export const VerifyEmailToken = (token) => {
  return verify(token, process.env.JWT);
};

// Generic rate limiter function
// export const createRateLimiter = (windowMs, maxRequests, message) => {
//   return rateLimit({
//       windowMs: windowMs,       // Time window in milliseconds
//       max: maxRequests,         // Maximum number of requests allowed
//       message: {
//           status: false,
//           message: message,
//           data: null
//       },
//       standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
//       legacyHeaders: false      // Disable the `X-RateLimit-*` headers
//   });
// };