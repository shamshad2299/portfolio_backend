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


//recieve email
const SendContactMail = async ({ name, email, phone, message }) => {
  try {
    const mailOptions = {
      from: `"Website Contact" <${email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Contact Form Submission",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
            <div style="max-width: 650px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
                <div style="background: linear-gradient(135deg, #6e8efb, #a777e3); padding: 30px; text-align: center; color: white;">
                    <h1 style="font-size: 28px; margin-bottom: 10px; font-weight: 600;">New Contact Request</h1>
                    <p style="font-size: 16px; opacity: 0.9;">You've received a new message from your website contact form</p>
                </div>
                
                <div style="padding: 35px;">
                    <div style="margin-bottom: 30px;">
                        <div style="display: flex; align-items: center; margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid #f0f0f0;">
                            <div style="width: 50px; height: 50px; background: #f5f7fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; color: #6e8efb; font-size: 20px;">👤</div>
                            <div>
                                <h3 style="font-size: 14px; color: #888; margin-bottom: 5px; font-weight: 500;">NAME</h3>
                                <p style="font-size: 18px; color: #333; font-weight: 500;">${name}</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid #f0f0f0;">
                            <div style="width: 50px; height: 50px; background: #f5f7fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; color: #6e8efb; font-size: 20px;">📧</div>
                            <div>
                                <h3 style="font-size: 14px; color: #888; margin-bottom: 5px; font-weight: 500;">EMAIL ADDRESS</h3>
                                <p style="font-size: 18px; color: #333; font-weight: 500;">${email}</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid #f0f0f0;">
                            <div style="width: 50px; height: 50px; background: #f5f7fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; color: #6e8efb; font-size: 20px;">📞</div>
                            <div>
                                <h3 style="font-size: 14px; color: #888; margin-bottom: 5px; font-weight: 500;">PHONE NUMBER</h3>
                                <p style="font-size: 18px; color: #333; font-weight: 500;">${phone || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #f9fafc; padding: 25px; border-radius: 10px;">
                        <h3 style="font-size: 16px; color: #6e8efb; margin-bottom: 15px; display: flex; align-items: center;">💬 MESSAGE</h3>
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #a777e3; font-size: 16px; line-height: 1.6; color: #444;">
                            ${message}
                        </div>
                    </div>
                </div>
                
                <div style="background: #f9fafc; padding: 20px; text-align: center; color: #888; font-size: 14px; border-top: 1px solid #eee;">
                    <p>This email was sent from your website's contact form</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

     // 2️⃣ Confirmation mail to user
    
const userMailOptions = {
  from: `"Shamshad's PortFolio" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "✨ Thank You for Contacting Us – We’ve Received Your Message!",
  html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f7fa; padding: 40px 20px; color: #333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0px 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center" bgcolor="#4f46e5" style="padding: 30px 20px;">
          <h1 style="margin: 0; font-size: 26px; color: #ffffff;">Your Website</h1>
          <p style="margin: 8px 0 0; font-size: 14px; color: #e0e7ff;">We’re here to listen ✨</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 30px 25px;">
          <h2 style="margin: 0 0 15px; font-size: 22px; color: #111827;">Hello ${name},</h2>
          <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.6; color: #374151;">
            Thank you for reaching out to us 🙏. We’ve successfully received your message and our team will get back to you shortly. 
          </p>
          
          <div style="margin: 20px 0; padding: 15px 20px; background: #f3f4f6; border-left: 4px solid #4f46e5; border-radius: 8px;">
            <p style="margin: 0; font-size: 15px; color: #1f2937;"><strong>Your Message:</strong></p>
            <p style="margin: 8px 0 0; font-size: 15px; color: #4b5563;">${message}</p>
          </div>

          <p style="margin: 25px 0 0; font-size: 15px; color: #374151;">
            Meanwhile, feel free to explore our website or reply directly to this email if you’d like to add more details.
          </p>

          <div style="margin: 30px 0 10px;" align="center">
            <a href="https://shamshadport.netlify.app" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 30px; font-size: 15px; font-weight: 600; display: inline-block;">Visit Our Website</a>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td bgcolor="#f9fafb" style="padding: 20px 25px; text-align: center; font-size: 13px; color: #6b7280;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Shamshad's Portfolio. All rights reserved.</p>
          <p style="margin: 4px 0 0;">226028 Business St, Lucknow, India</p>
        </td>
      </tr>
    </table>
  </div>
  `,
};


    await transporter.sendMail(userMailOptions);

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Mailer error:", error);
    return { success: false, error: "Something went wrong while sending email" };
  }
};
export default SendContactMail;
