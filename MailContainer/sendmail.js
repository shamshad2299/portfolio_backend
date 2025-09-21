import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,            // smtp.gmail.com
  port: parseInt(process.env.EMAIL_PORT),  // 587
  secure: process.env.EMAIL_SECURE === "true", // false for 587, true for 465
  auth: {
    user: process.env.EMAIL_USER,          // your Gmail
    pass: process.env.EMAIL_PASSWORD,      // your 16-char App Password
  },
});



const SendContactMail = async ({ name, email, phone, message }) => {
  try {
    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Mailer error:", error);
    return { success: false, error: "Something went wrong while sending email" };
  }
};

export default SendContactMail;
