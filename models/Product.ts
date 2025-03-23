import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  images: [String],
  rating: Number,
  reviews: Number,
  brand: String,
  description: String,
  shop: {
    name: String,
    rating: Number,
    followers: String
  },
  warranty: String,
  returnPolicy: String
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

export interface IProduct extends mongoose.Document {
  id: number;
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