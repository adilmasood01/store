"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { featuredProducts } from '../products';

const FeaturedProducts = () => {
  const { addItem } = useCart();

  return (
    <section className="bg-white p-6 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <Link href={`/product/${product.id}`}>
              <Image src={`/images/${product.img}`} alt={product.name} width={300} height={200} className="w-full h-48 object-cover cursor-pointer" />
            </Link>
            <h3 className="text-black font-semibold text-lg mt-2">{product.name}</h3>
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
