import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function sendMailToUser({ email, subject, template, data }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: parseInt(process.env.EMAIL_PORT, 10) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    logger: true,
    debug: true,
  });

  // ✅ Clean up template path
  const templatePath = path.join(__dirname, "templates", template);
  console.log("templatePath", templatePath);

  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: `"BTM" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      accepted: info.accepted || [],
      rejected: info.rejected || [],
    };
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return {
      accepted: [],
      rejected: [email],
    };
  }
}

export default sendMailToUser;
