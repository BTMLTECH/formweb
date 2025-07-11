import express  from  "express";
import cors  from  "cors";
import sendMailToUser from "./mailer.js"

import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const formData = req.body;

  try {
    const result = await sendMailToUser({
      email: process.env.EMAIL_USER,
      subject: "New Visa/Immigration Form Submission",
      template: "visa_submission.ejs",
      data: formData,
    });

    if (result.accepted.length > 0) {
      return res.status(200).json({ success: true, message: "Email sent!" });
    } else {
      return res.status(500).json({ success: false, message: "Email rejected." });
    }
  } catch (err) {
    console.error("Email sending error:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to send email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
