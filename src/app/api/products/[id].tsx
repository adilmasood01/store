import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  await dbConnect();

  try {
    const product = await Product.findById(id).lean().exec();
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Convert MongoDB ObjectId to string
    product._id = product._id.toString();
    
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}