import connectDB from "@/app/lib/mongodb";
import User from "@/app/Sachema/User";
import bcrypt from "bcrypt";
export async function POST(req) {
  try {
    await connectDB(); 
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "Email and password are required" }),
        { status: 400 }
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
    const newUser =await User.create({
    email,
    passwordHash,
    provider: "email",
});
    return new Response(
      JSON.stringify({ success: true, message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("register error", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}