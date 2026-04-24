export const otpTemplate = (name, otp) => {
  return `
    <h2>Hello ${name}</h2>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This OTP will expire in 5 minutes.</p>
  `;
};
