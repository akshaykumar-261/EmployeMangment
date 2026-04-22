import nodemailer from "nodemailer";

console.log("EMAIL_USER======>:", process.env.EMAIL_USER);
console.log("EMAIL_PASS======>:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpMail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login Otp",
    html: `
        <h2>OTP Verification</h2>
        <p>Your otp is:<b>${otp}</b></p>
        <p>This otp will expire in 5 minutes.</p>
        `,
  });
};
