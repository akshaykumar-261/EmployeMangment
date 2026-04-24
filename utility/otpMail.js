import { sendEmail } from "./emailService.js";
import { otpTemplate } from "./otpTemplate.js";

export const sendOtpMail = async (email, otp, name = "User") => {
  return await sendEmail({
    to: { email, name },
    subject: "Your Login OTP",
    htmlContent: otpTemplate(name, otp),
  });
};
