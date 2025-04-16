import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../../../lib/dbConnect';
import { FeaturedProduct, FlashSale } from '../../../../../models/Product';
import { ObjectId } from 'mongodb';

interface Params {
  params: Promise<{ id: string }>; // <- fix here: treat as Promise
}

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    console.log("Fetching product...");

    // Await the context.params Promise
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing product ID' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID format' },
        { status: 400 }
      );
    }

    await dbConnect();

    const product =
      (await FeaturedProduct.findById(id).lean().exec()) ||
      (await FlashSale.findById(id).lean().exec());

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
