"use client";
import Image from "next/image";
import Link from "next/link";
import toast from 'react-hot-toast';

const Categories = () => {
  const categories = [
    { name: "Mobiles", img: "/images/mobiles.jpg", link: "/categories/mobiles" },
    { name: "Outdoor Lighting", img: "/images/outdoor-lighting.jpg", link: "/categories/outdoor-lighting" },
    { name: "Men's T-Shirts", img: "/images/mens-tshirts.jpg", link: "/categories/mens-tshirts" },
    { name: "Baby Disposable Diapers", img: "/images/baby-diapers.jpg", link: "/categories/baby-diapers" },
    { name: "Wireless Earbuds", img: "/images/earbuds.jpg", link: "/categories/earbuds" },
  ];

  return (
    <section className="bg-white p-3 sm:p-6 rounded-lg shadow-md my-4 sm:my-8">
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Popular Categories</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.link} passHref>
            <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer w-full h-[140px] sm:h-[220px] flex flex-col items-center justify-between"
              onClick={() => toast('Browsing category: ' + category.name)}>
              <Image
                src={category.img}
                alt={category.name}
                width={90}
                height={90}
                className="mx-auto object-cover rounded-md w-[90px] h-[90px] sm:w-[150px] sm:h-[150px]"
              />
              <h3 className="text-xs sm:text-sm font-semibold mt-1 sm:mt-2 text-black">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
