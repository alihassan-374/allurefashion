import connectDB from "@/app/lib/mongodb";
import EmailOTP from "@/app/Sachema/EmailOTP";
import User from "@/app/Sachema/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email and OTP are required",
        }),
        { status: 400 }
      );
    }

    const record = await EmailOTP.findOne({ email });

    if (!record) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "OTP not found. Please request a new one.",
        }),
        { status: 400 }
      );
    }

    // Check expiry
    if (record.expiresAt < new Date()) {
      await EmailOTP.deleteOne({ email });

      return new Response(
        JSON.stringify({
          success: false,
          error: "OTP expired",
        }),
        { status: 400 }
      );
    }

    // Check attempts
    if (record.attempts >= 5) {
      await EmailOTP.deleteOne({ email });

      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many failed attempts. Request a new OTP.",
        }),
        { status: 400 }
      );
    }

    // Verify OTP
    const match = await bcrypt.compare(otp, record.otpHash);

    if (!match) {
      record.attempts += 1;
      await record.save();

      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid OTP",
        }),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await EmailOTP.deleteOne({ email });

      return new Response(
        JSON.stringify({
          success: false,
          error: "User already exists",
        }),
        { status: 400 }
      );
    }

    // Create user
    await User.create({
      email,
      passwordHash: record.passwordHash,
      provider: "email",
    });

    // Delete OTP record
    await EmailOTP.deleteOne({ email });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account created successfully.",
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      { status: 500 }
    );
  }
}