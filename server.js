import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const formData = req.body;

  const html = `
    <h2>New Visa/Immigration Request</h2>
    <p><strong>Full Name:</strong> ${formData.Full_name}</p>
    <p><strong>Email:</strong> ${formData.Email}</p>
    <p><strong>Phone Number:</strong> ${formData.Phone_Number}</p>
    <p><strong>Visa Type:</strong> ${formData.Visa_Type}</p>
    <p><strong>Nationality:</strong> ${formData.Nationality}</p>
    <p><strong>Passport Type:</strong> ${formData.Passport_Type}</p>
    <p><strong>Issued By:</strong> ${formData.Issued_By}</p>
    <p><strong>Expiration Date:</strong> ${formData.expiration_date}</p>
    <p><strong>Originating Country:</strong> ${formData.Originating_Country}</p>
    <p><strong>Country of Arrival:</strong> ${formData.Country_of_Arrival}</p>
    <p><strong>Heard about us via:</strong> ${formData.contact}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"BTM Web Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Visa/Immigration Form Submission",
      html,
    });

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
