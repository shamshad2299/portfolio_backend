
import express from "express";
import cors from "cors";
import SendContactMail from "./MailContainer/sendmail.js"; // adjust path
import Contact from "./models/contact.js";                // if using MongoDB
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(cors({
  origin: "*", // frontend URL during dev
  methods: ["GET", "POST", "OPTIONS"],
}));
app.use(express.json());
app.use(bodyParser.json());

app.get("/" , async(req , res)=>{
  res.json({
    name : "shamshad Ahamad",
    age : 23,
    section : "L"
  })
})

// MongoDB connection (make sure to use a cloud DB like MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save contact
    const newContact = await Contact.create({ name, email, phone, message });

    // Send email
    await SendContactMail({ name, email, phone, message });

    res.status(201).json({ success: true, data: newContact });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Export handler for Vercel
export default app;
