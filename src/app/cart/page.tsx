"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback } from "react";

// Define Type for Cart Items
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const { cartItems, removeItem, updateQuantity, clearCart } = useCart() as {
    cartItems: CartItem[];
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = useCallback((id: string) => removeItem(id), [removeItem]);
  const handleUpdateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity >= 1) {
        updateQuantity(id, quantity);
      }
    },
    [updateQuantity]
  );

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Page Title */}
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          // Empty Cart Message
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 text-4xl mb-4">Your cart is empty</p>
            <Link href="/" className="text-red-600 text-4xl hover:text-red-700">
              Continue shopping
            </Link>
          </motion.div>
        ) : (
          // Cart Items Container
          <motion.div
            className="bg-black p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="border-b pb-6 last:border-b-0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded"
                    />
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                      <p className="text-gray-400">${item.price.toFixed(2)}</p>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className={`px-3 py-1 border rounded ${
                            item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span className="px-3 text-white">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 border rounded"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>

                        {/* Remove Button */}
                        <motion.button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 ml-4 hover:text-red-700"
                          aria-label={`Remove ${item.name} from cart`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Remove
                        </motion.button>
                      </div>

                      {/* Item Total Price */}
                      <p className="mt-2 font-semibold text-white">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Order Summary */}
            <div className="mt-8 pt-6 border-t border-gray-600">
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white">
                  Total: ${total.toFixed(2)}
                </h3>
                
                {/* Actions: Clear Cart & Checkout */}
                <div className="flex gap-4 items-center mt-4">
                  <motion.button
                    onClick={clearCart}
                    className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-900 transition text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Cart
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/checkout"
                      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                    >
                      Checkout
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
