"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-red-100 shadow-md fixed w-full py-2 sm:py-4 top-0 z-50 text-base sm:text-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer">
                <Image src="/logo.png" alt="Store Logo" width={32} height={32} className="sm:w-10 sm:h-10 w-8 h-8" />
                <span className="text-xl sm:text-4xl font-bold text-red-600">Store</span>
              </div>
            </Link>
          </div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6">
            {user ? (
              <button onClick={logout} className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
                🚪 Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
                  🔑 Login
                </button>
              </Link>
            )}
            <Link href="/cart">
              <button className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
                🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="sm:hidden text-red-600 text-2xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden flex flex-col bg-red-50 rounded-lg shadow-lg p-4 mt-2 space-y-4"
          >
            {/* Search Bar (Visible on Mobile) */}
            <div className="w-full">
              <SearchBar />
            </div>
            <div className="flex flex-col space-y-3">
              {user ? (
                <button 
                  onClick={logout} 
                  className="text-gray-600 hover:text-red-600 text-base py-2 px-4 rounded-lg hover:bg-red-100 transition-colors"
                >
                  🚪 Logout
                </button>
              ) : (
                <Link href="/login" className="w-full">
                  <button className="w-full text-gray-600 hover:text-red-600 cursor-pointer text-base py-2 px-4 rounded-lg hover:bg-red-100 transition-colors">
                    🔑 Login
                  </button>
                </Link>
              )}
              <Link href="/cart" className="w-full">
                <button className="w-full text-gray-600 hover:text-red-600 cursor-pointer text-base py-2 px-4 rounded-lg hover:bg-red-100 transition-colors">
                  🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
