import nodemailer from "nodemailer";

console.log("SMTP_USER======>:", process.env.SMTP_USER);
console.log("SMTP_PASS======>:", process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpMail = async (email, otp, name = "User") => {
  await transporter.sendMail({
    from: `"Employee Management System" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Your Login OTP",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${name},</h2>

        <p>Your OTP for login is:</p>

        <h1 style="letter-spacing: 5px; color: blue;">
          ${otp}
        </h1>

        <p>This OTP will expire in 5 minutes.</p>

        <p>If you did not request this login, please ignore this email.</p>

        <br />

        <p>Regards,</p>
        <p>Employee Management System</p>
      </div>
    `,
  });
};