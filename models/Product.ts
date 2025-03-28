import mongoose from "mongoose";

// Define the common schema for products
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  shop: {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    followers: { type: String, default: "0" },
  },
  warranty: { type: String, default: "No warranty" },
  returnPolicy: { type: String, default: "No return policy" },
});

// Create text index for search and unique constraint on custom ID
productSchema.index({ name: "text" });

// Models for different collections
const FeaturedProduct =
  mongoose.models.FeaturedProduct || mongoose.model("FeaturedProduct", productSchema, "featured_products");

const FlashSale =
  mongoose.models.FlashSale || mongoose.model("FlashSale", productSchema, "flash_sale");

// Export the models
export { FeaturedProduct, FlashSale };

// TypeScript Interface for Type Safety
export interface IProduct extends mongoose.Document {
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  reviews: number;
  brand: string;
  description: string;
  shop: {
    name: string;
    rating: number;
    followers: string;
  };
  warranty: string;
  returnPolicy: string;
}
