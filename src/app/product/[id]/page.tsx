"use client";

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  brand?: string;
  rating?: number;
  reviews?: number;
}

const ProductDetail = () => {
  const { id } = useParams() as { id: string };
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.product);
        } else {
          throw new Error(data.message);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: `/images/${product.images[0]}`,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const renderRating = (rating: number = 4.5) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index} 
            className={`w-4 h-4 ${index < rating ? 'bg-[#ffb400]' : 'bg-gray-300'} mask mask-star`} 
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">({product?.reviews || 0} Ratings)</span>
      </div>
    );
  };

  if (loading) return <p className="text-center mt-10 text-red-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold mt-10">{error}</p>;
  if (!product) return <p className="text-center text-red-600 font-semibold mt-10">Product not found</p>;

  return (
    <section className="p-4 bg-gray-100 pt-20 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Gallery */}
        <div className="w-full lg:w-2/5 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative h-64 sm:h-80 md:h-96 mb-4">
            <Image
              src={`/images/${product.images[selectedImage]}`}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img: string, index: number) => (
              <div
                key={img}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 border-2 cursor-pointer ${
                  selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <Image
                  src={`/images/${img}`}
                  alt=""
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-3/5 space-y-4">
          <h1 className="text-xl sm:text-2xl font-normal text-gray-800">{product.name}</h1>
          
          <div className="flex flex-wrap items-center gap-4">
            {renderRating(product.rating)}
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">2k+ Sold</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-orange-500">${product.price}</span>
              <span className="text-lg sm:text-xl text-gray-500 line-through">${product.price * 1.5}</span>
              <span className="text-green-600 font-medium">-33%</span>
            </div>
            
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>Installment:</span>
              <span className="font-medium text-blue-600">1,017/month</span>
              <span className="text-gray-400">with</span>
              <Image src="/icons/BAF.jpg" width={50} height={20} alt="bKash" />
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Image src="/icons/delivery-truck.jpg" width={24} height={24} alt="Delivery" />
              <span className="font-bold text-gray-800">Delivery</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2">
              <div>
                <p className="text-gray-600">China: <span className="font-medium">1-2 days</span></p>
                <p className="text-gray-600">Outside China: <span className="font-medium">3-5 days</span></p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 transition-colors" type="button">Change Location</button>
            </div>
          </div>

          {/* Service Options */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-800">
                7 Days Returns
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                Warranty not available
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-600">Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  type="button"
                >
                  -
                </button>
                <span className="w-12 text-center border-x text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition-colors"
              type="button"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition-colors"
              type="button"
            >
              Buy Now
            </button>
          </div>

          {/* Seller Info */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image 
                  src="/images/seller-logo.jpg" 
                  width={40} 
                  height={40} 
                  alt="Seller" 
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-800">Official Store</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>94% Positive Seller Ratings</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>4.8/5</span>
                  </div>
                </div>
              </div>
              <button 
                className="w-full sm:w-auto px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                type="button"
              >
                Visit Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specs */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Brand</span>
            <span className="text-gray-700">{product.brand || 'Generic'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Model</span>
            <span className="text-gray-700">X-2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Warranty</span>
            <span className="text-gray-700">1 Year</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">SKU</span>
            <span className="text-gray-700">DZ{product._id.slice(0, 4)}X</span>
          </div>
        </div>
      </div>

      {/* Promotions */}
      <div className="mt-4 bg-white p-4 rounded shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Promotions</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</div>
            Get 10% off with City Bank Credit Cards
          </li>
          <li className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</div>
            Free gift worth 500 on purchase above 2000
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProductDetail;