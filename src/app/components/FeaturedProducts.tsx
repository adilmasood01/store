"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  img: string;
}

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/featured-products');
        const data = await response.json();
        if (data.success) setProducts(data.products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-white p-3 sm:p-6 rounded-lg shadow-md my-4 sm:my-8">
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-2 sm:p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col min-h-[240px] sm:min-h-[300px]">
            <Link href={`/product/${product._id}`} passHref>
              <div>
                <Image 
                  src={`/images/${product.img}`} 
                  alt={product.name} 
                  width={110} 
                  height={110} 
                  className="mx-auto mb-1 sm:mb-2 object-cover w-[110px] h-[110px] sm:w-full sm:h-48 cursor-pointer rounded" 
                />
                <h3 className="text-black font-semibold text-xs sm:text-lg mt-1 sm:mt-2 hover:text-red-500 cursor-pointer">
                  {product.name}
                </h3>
              </div>
            </Link>
            <p className="text-red-600 font-bold mt-1 sm:mt-2 text-sm sm:text-base">${product.price}.00</p>
            <button 
              onClick={() => {
                addItem({
                  id: product.id.toString(),
                  name: product.name,
                  price: product.price,
                  image: `/images/${product.img}`,
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

export default FeaturedProducts;