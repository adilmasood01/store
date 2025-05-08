"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-red-100 shadow-md fixed w-full py-2 sm:py-4 top-0 z-50 text-base sm:text-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer">
                <Image src="/logo.png" alt="Store Logo" width={32} height={32} className="sm:w-10 sm:h-10 w-8 h-8" />
                <span className="text-2xl sm:text-4xl font-bold text-red-600">Store</span>
              </div>
            </Link>
          </div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <button onClick={logout} className="text-gray-600 hover:text-red-600 cursor-pointer">
                🚪 Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="text-gray-600 hover:text-red-600 cursor-pointer">
                  🔑 Login
                </button>
              </Link>
            )}
            <Link href="/cart">
              <button className="text-gray-600 hover:text-red-600 cursor-pointer">
                🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="sm:hidden text-red-600 text-3xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => setIsOpen(!isOpen)} aria-label="Open menu">
            ☰
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="sm:hidden flex flex-col bg-red-50 rounded shadow p-4 mt-2 space-y-4 animate-fade-in">
            {/* Search Bar (Visible on Mobile) */}
            <div className="flex">
              <SearchBar />
            </div>
            {user ? (
              <button onClick={logout} className="text-gray-600 hover:text-red-600 text-base">
                🚪 Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="text-gray-600 hover:text-red-600 cursor-pointer text-base">
                  🔑 Login
                </button>
              </Link>
            )}
            <Link href="/cart">
              <button className="text-gray-600 hover:text-red-600 cursor-pointer text-base">
                🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
