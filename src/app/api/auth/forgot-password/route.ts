import { NextResponse } from "next/server";
import { dbConnect } from "../../../../../lib/dbConnect";
import User from "../../../../../models/User";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "No user found with this email" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // In a real application, you would send an email here with the reset link
    // For now, we'll just return the token (in production, you would send an email)
    return NextResponse.json(
      { 
        success: true, 
        message: "Password reset instructions have been sent to your email",
        resetToken // In production, remove this line and send email instead
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 