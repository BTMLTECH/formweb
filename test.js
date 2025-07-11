import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

async function testEmail() {
  const data = {
    Full_name: "Jane Doe",
    Phone_Number: "+1 234 567 8900",
    Visa_Type: "Tourist",
    Nationality: "Canadian",
    Passport_Type: "Ordinary",
    Issued_By: "Canada",
    expiration_date: "2028-12-31",
    Originating_Country: "Canada",
    Country_of_Arrival: "France",
    contact: "Friend referral",
  };

  const subject = "BTM Visa/Immigration Request from " + data.Full_name;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: parseInt(process.env.EMAIL_PORT) === 465,
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

  const templatePath = path.join(__dirname, "templates", "visa_submission.ejs");

  try {
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: `"BTM" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // or change to `data.Email` if sending to user
      subject,
      html,
    };

    console.log("MailOptions before sending:", mailOptions);


    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);

    return {
      accepted: info.accepted || [],
      rejected: info.rejected || [],
    };
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return {
      accepted: [],
      rejected: [data.Email],
    };
  }
}

testEmail();
