import { NextResponse } from "next/server";
import { dbConnect } from "../../../../../lib/dbConnect";
import { FeaturedProduct, FlashSale } from "../../../../../models/Product";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Fetching product...");
    
    // Properly await the params by destructuring
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing product ID" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Try to find product in both collections
    let product =
      (await FeaturedProduct.findById(id).lean().exec()) ||
      (await FlashSale.findById(id).lean().exec());

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}