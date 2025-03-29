"use client";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const categories = [
    { name: "Mobiles", img: "/images/mobiles.jpg", link: "/categories/mobiles" },
    { name: "Outdoor Lighting", img: "/images/outdoor-lighting.jpg", link: "/categories/outdoor-lighting" },
    { name: "Men's T-Shirts", img: "/images/mens-tshirts.jpg", link: "/categories/mens-tshirts" },
    { name: "Baby Disposable Diapers", img: "/images/baby-diapers.jpg", link: "/categories/baby-diapers" },
    { name: "Wireless Earbuds", img: "/images/earbuds.jpg", link: "/categories/earbuds" },
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.link} passHref>
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointerw-full h-[220px] flex flex-col items-center justify-between;">
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

export default Categories;
