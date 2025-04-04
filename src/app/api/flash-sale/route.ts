import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import { FlashSale } from "../../../../models/Product";

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();
    const products = await FlashSale.find().lean().exec();
    return NextResponse.json({ success: true, products });
  } catch (error: unknown) {
    console.error("Error fetching flash sale products:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}