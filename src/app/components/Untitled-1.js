"use client";
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from "next/link";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 55, seconds: 31 });
  const products = [
    { id: 1, name: "UniLove Powder Scent Baby Wipes 100's Pack", price: "347.00", oldPrice: "534.00", discount: "-35%", image: "/images/1.jpg" },
    { id: 2, name: "50ml Oil based Perfume Collections", price: "119.54", oldPrice: "220.00", discount: "-46%", image: "/images/2.jpg" },
    { id: 3, name: "Baseus iPhone Cable 1.5A", price: "103.00", oldPrice: "219.00", discount: "-53%", image: "/images/3.jpg" },
    { id: 4, name: "WHISKAS Junior Wet Kitten Food", price: "₱924.00", oldPrice: "₱1024.00", discount: "10%", image: "/images/4.jpg" },
    { id: 5, name: "PRO COMBAT Running Shorts", price: "109.70", oldPrice: "780.00", discount: "-86%", image: "/images/5.jpg" },
    { id: 6, name: "Rivers Hanging Diffuser Refill", price: "114.37", oldPrice: "149.00", discount: "-23%", image: "/images/6.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours -= 1;
              minutes = 59;
              seconds = 59;
            } else {
              clearInterval(interval);
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Flash Sale</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-red-600 font-semibold text-2xl">On Sale Now</span>
        <div className="flex items-center space-x-2 text-2xl text-bold ">
          <span className="bg-red-600 text-white px-3 py-2 rounded">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>:
          <span className="bg-red-600 text-white px-3 py-2 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>:
          <span className="bg-red-600 text-white px-3 py-2 rounded">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
        <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white">
          SHOP ALL PRODUCTS
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-900 p-4 rounded-lg text-center">
            <Image src={product.image} alt={product.name} width={150} height={150} className="mx-auto mb-2 object-cover w-[150px] h-[150px]" />
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="text-green-600 font-bold">{product.price}</p>
            <p className="text-red-600 line-through text-sm">{product.oldPrice}</p>
            <p className="text-green-600 text-sm">{product.discount}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Categories = () => {
  const categories = [
    { name: "Mobiles", img: "/images/mobiles.jpg", link: "/categories/mobiles" },
    { name: "Outdoor Lighting", img: "/images/outdoor-lighting.jpg", link: "/categories/outdoor-lighting" },
    { name: "Men's T-Shirts", img: "/images/mens-tshirts.jpg", link: "/categories/mens-tshirts" },
    { name: "Baby Disposable Diapers", img: "/images/baby-diapers.jpg", link: "/categories/baby-diapers" },
    { name: "Wireless Earbuds", img: "/images/earbuds.jpg", link: "/categories/earbuds" },
  ];

  return (
    <section className="my-8 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.link} passHref>
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Image
                src={category.img}
                alt={category.name}
                width={100}
                height={100}
                className="mx-auto object-cover rounded-md w-[150px] h-[150px]"
              />
              <h3 className="text-sm font-semibold mt-2 text-black">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>E-Commerce Store</title>
        <meta name="description" content="Online Shopping Platform" />
      </Head>

      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-red-600">Store</span>
            </div>
            <div className="flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input type="text" className="w-full px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-red-500" placeholder="Search products..." />
                <button className="absolute right-0 top-0 h-full px-6 bg-red-600 text-white rounded-r hover:bg-red-700">
                  Search
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-700 hover:text-red-600">
                <span className="ml-1">🔑Login</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-red-600">
                <span className="ml-1">🛒Cart</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="mt-4 rounded-lg overflow-hidden">
          <Image src="https://assets.awwwards.com/awards/element/2023/01/63d718ade1c15939821397.png" alt="Hero Banner" width={1920} height={600} className="object-cover w-full h-96" />
        </div>

        <FlashSale />

        <section className="my-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { img: "1.jpg", price: 500 },
              { img: "2.jpg", price: 750 },
              { img: "3.jpg", price: 1200 },
              { img: "4.jpg", price: 999 }
            ].map((product, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg">
                <Image src={`/images/${product.img}`} alt={`Product ${i + 1}`} width={300} height={200} className="w-full h-48 object-cover" />
                <h3 className="font-semibold text-lg mt-2">Product {i + 1}</h3>
                <p className="text-red-600 font-bold mt-2">{product.price}.00</p>
                <button className="mt-4 w-full bg-red-600 text-white py-2 rounded">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <Categories />
      </main>

      <footer className="bg-gray-600 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2023 MyStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}