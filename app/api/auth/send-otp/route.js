import connectDB from '@/app/lib/mongodb';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '@/app/Sachema/User';
import EmailOTP from '@/app/Sachema/EmailOTP';
export async function POST(request) {
  try {
    await connectDB();
    const { email , password } = await request.json();



    if (!email) {
      console.log("NO email found")
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 404 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, error: "User already exists" }),
        { status: 400 }
      );
    }


    const passwordHash = await bcrypt.hash(password, 10);
    // Generate OTP and hash
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || 5, 10);
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
    // Upsert OTP record
    await EmailOTP.findOneAndUpdate(
      { email },
      {
        otpHash,
        passwordHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        attempts: 0,
        verified: false,
      },
      { upsert: true, new: true }
    );


    // Setup mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // automatically uses smtp.gmail.com with TLS
      auth: {
        user: process.env.SMTP_USER,  // not EMAIL_USER
        pass: process.env.SMTP_PASS,
      },
    });


    // Mail content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for ${expiryMinutes} minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for ${expiryMinutes} minutes.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sending OTP:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
