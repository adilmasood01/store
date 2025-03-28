// app/api/flash-sale/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import { FlashSale } from "../../../../models/Product";

export async function GET() {
  try {
    await dbConnect();
    const products = await FlashSale.find().lean().exec();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}