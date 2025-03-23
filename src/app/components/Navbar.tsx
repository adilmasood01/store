"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md fixed w-full py-4 top-0 z-50 text-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <button className="text-4xl font-bold text-red-600 focus:outline-none">
                Store
              </button>
            </Link>
          </div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-l border bg-amber-50 border-gray-300 focus:outline-none focus:border-red-500 text-black"
                placeholder="Search products..."
              />
              <button className="absolute right-0 top-0 h-full px-6 bg-red-600 text-white rounded-r hover:bg-red-700">
                Search
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <button onClick={logout} className="text-gray-400 hover:text-red-600">
                🚪 Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="text-gray-400 hover:text-red-600">
                  🔑 Login
                </button>
              </Link>
            )}
            <Link href="/cart">
              <button className="text-gray-400 hover:text-red-600">
                🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="sm:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="sm:hidden flex flex-col bg-black p-4 space-y-3">
            {/* Search Bar (Visible on Mobile) */}
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-red-500 text-black"
                placeholder="Search products..."
              />
              <button className="px-6 bg-red-600 text-white rounded-r hover:bg-red-700">
                Search
              </button>
            </div>
            {user ? (
              <button onClick={logout} className="text-gray-400 hover:text-red-600">
                🚪 Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="text-gray-400 hover:text-red-600">
                  🔑 Login
                </button>
              </Link>
            )}
            <Link href="/cart">
              <button className="text-gray-400 hover:text-red-600">
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
