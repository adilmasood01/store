import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import FlashSale from "@/app/components/FlashSale";
import Categories from "@/app/components/Categories";
import FeaturedProducts from "@/app/components/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="mt-4 rounded-lg overflow-hidden">
          <Image src="https://assets.awwwards.com/awards/element/2023/01/63d718ade1c15939821397.png" alt="Hero Banner" width={1920} height={600} className="object-cover w-full h-96" />
        </div>
        <FlashSale />
        <FeaturedProducts />
        <Categories />
      </main>
    </div>
  );
}
