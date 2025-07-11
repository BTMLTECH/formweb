import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();



async function testEmail() {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
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
