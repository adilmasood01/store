"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import toast from 'react-hot-toast';

interface FlashSaleProduct {
  _id: string;
  name: string;
  price: number;
  oldPrice: number;
  discount: string;
  img: string;
}

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 55, seconds: 31 });
  const [products, setProducts] = useState<FlashSaleProduct[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/flash-sale");
        const data = await response.json();
        if (data.success) setProducts(data.products);
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { hours, minutes, seconds } = prevTime;
        if (seconds > 0) return { ...prevTime, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        
        clearInterval(interval);
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white p-3 sm:p-6 rounded-lg shadow-md my-4 sm:my-8">
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Flash Sale</h2>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4">
        <span className="text-red-600 font-semibold text-lg sm:text-2xl">On Sale Now</span>
        <div className="flex items-center space-x-1 sm:space-x-2 text-lg sm:text-2xl font-bold">
          <span className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>:
          <span className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>:
          <span className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
        <button 
          className="border border-red-600 text-red-600 px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-600 hover:text-white text-xs sm:text-base"
          type="button"
        >
          SHOP ALL PRODUCTS
        </button>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-2 sm:p-4 rounded-lg text-center flex flex-col min-h-[260px] sm:min-h-[300px]">
            <Link href={`/product/${product._id}`} passHref>
              <div>
                <Image 
                  src={product.img} 
                  alt={product.name} 
                  width={110} 
                  height={110} 
                  className="mx-auto mb-1 sm:mb-2 object-cover w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] cursor-pointer" 
                />
              </div>
            </Link>
            <div className="flex-grow">
              <Link href={`/product/${product._id}`} passHref>
                <p className="text-black text-xs sm:text-sm font-semibold hover:text-red-500 cursor-pointer">
                  {product.name}
                </p>
              </Link>
              <p className="text-green-600 font-bold text-sm sm:text-base">${product.price}</p>
              <p className="text-red-600 line-through text-xs sm:text-sm">${product.oldPrice}</p>
              <p className="text-green-600 text-xs sm:text-sm">{product.discount}</p>
            </div>
            <button 
              onClick={() => {
                addItem({
                  id: product._id.toString(),
                  name: product.name,
                  price: parseFloat(product.price.toString()),
                  image: product.img,
                  quantity: 1
                });
                toast.success('Added to cart!');
              }}
              className="mt-2 sm:mt-4 w-full bg-red-600 text-white py-1 sm:py-2 rounded hover:bg-red-700 cursor-pointer text-xs sm:text-base"
              type="button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSale;