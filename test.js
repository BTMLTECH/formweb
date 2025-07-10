import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
console.log("EMAIL_HOST", process.env.EMAIL_HOST)
console.log("EMAIL_USER", process.env.EMAIL_USER)
console.log("EMAIL_PASS", process.env.EMAIL_PASS)
console.log("EMAIL_PORT", process.env.EMAIL_PORT)


async function testEmail() {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT == "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test email",
      text: "This is a test email.",
    });
    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Error sending test email:", err);
  }
}

testEmail();
