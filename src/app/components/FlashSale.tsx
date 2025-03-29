"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 55, seconds: 31 });
  const [products, setProducts] = useState<any[]>([]);
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
        let { hours, minutes, seconds } = prevTime;
        if (seconds > 0) seconds -= 1;
        else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else clearInterval(interval);

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md my-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Flash Sale</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-red-600 font-semibold text-2xl">On Sale Now</span>
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <span className="bg-yellow-500 text-white px-3 py-2 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>:
          <span className="bg-yellow-500 text-white px-3 py-2 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>:
          <span className="bg-yellow-500 text-white px-3 py-2 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
        <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white">
          SHOP ALL PRODUCTS
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg text-center flex flex-col min-h-[300px]">
            <Link href={`/product/${product._id}`}>
              <Image src={product.img} alt={product.name} width={150} height={150} className="mx-auto mb-2 object-cover w-[150px] h-[150px] cursor-pointer" />
            </Link>
            <div className="flex-grow">
              <Link href={`/product/${product._id}`}>
                <p className="text-black text-sm font-semibold hover:text-red-500 cursor-pointer">{product.name}</p>
              </Link>
              <p className="text-green-600 font-bold">{product.price}</p>
              <p className="text-red-600 line-through text-sm">{product.oldPrice}</p>
              <p className="text-green-600 text-sm">{product.discount}</p>
            </div>
            <button 
              onClick={() => addItem({
                id: product._id.toString(),
                name: product.name,
                price: parseFloat(product.price.toString()),
                image: product.img,
                quantity: 1
              })}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
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
