import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

// API key set
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

// API instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOtpMail = async (email, otp, name = "User") => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Your Login OTP";

  sendSmtpEmail.htmlContent = `
    <h2>Hello ${name}</h2>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This OTP will expire in 5 minutes.</p>
  `;

  sendSmtpEmail.sender = {
    name: "Employee Management System",
    email: process.env.EMAIL_FROM,
  };

  sendSmtpEmail.to = [
    {
      email,
      name,
    },
  ];

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.log("Error sending email:", error.response?.body || error.message);
  }
};
