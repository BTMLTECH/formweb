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
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const formData = req.body;

  const html = `
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
  <h2 style="color: #004aad; border-bottom: 2px solid #004aad; padding-bottom: 10px;">New Visa / Immigration Request</h2>
  
  <table style="width: 100%; border-collapse: collapse;">
    <tbody>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Full Name:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Full_name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Email:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Phone Number:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Phone_Number}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Visa Type:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Visa_Type}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Nationality:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Nationality}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Passport Type:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Passport_Type}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Issued By:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Issued_By}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Expiration Date:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.expiration_date}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Originating Country:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Originating_Country}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ccc;">Country of Arrival:</td>
        <td style="padding: 8px; border-bottom: 1px solid #ccc;">${formData.Country_of_Arrival}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Heard About Us Via:</td>
        <td style="padding: 8px;">${formData.contact}</td>
      </tr>
    </tbody>
  </table>

  <p style="font-size: 0.9em; color: #777; margin-top: 20px;">This email was generated automatically by the BTM Web Form system.</p>
</div>

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
  console.error("Email sending error:", err);
  res.status(500).json({ success: false, error: "Failed to send email.", details: err.message });
}

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
