// FeaturedProducts.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<any[]>([]);

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
    <section className="bg-white p-6 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <Link href={`/product/${product._id}`}>
            <Image src={`/images/${product.img}`} alt={product.name} width={300} height={200} className="w-full h-48 object-cover cursor-pointer" />
            <h3 className="text-black font-semibold text-lg mt-2 hover:text-red-500 cursor-pointer">{product.name}</h3>
            </Link>
            <p className="text-red-600 font-bold mt-2">{product.price}.00</p>
            <button 
              onClick={() => addItem({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: `/images/${product.img}`,
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

export default FeaturedProducts;