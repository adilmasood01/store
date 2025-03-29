"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback } from "react";

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
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <motion.h1
          className="text-4xl font-bold text-center text-red-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-12 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/icons/empty-cart.png"
              alt="Empty Cart"
              width={200}
              height={200}
              className="mb-6 opacity-80"
            />
            <p className="text-gray-400 text-2xl mb-4">Oops! Your cart is empty.</p>
            <p className="text-gray-500 text-lg mb-6">Looks like you haven't added anything yet.</p>
            <Link href="/" className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition text-lg">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="border-b border-gray-700 pb-6 last:border-b-0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-red-300">{item.name}</h2>
                      <p className="text-gray-400">${item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className={`px-3 py-1 border rounded bg-gray-700 text-white hover:bg-gray-600 transition ${
                            item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span className="px-3 text-lg font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 border rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                        <motion.button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 ml-4 hover:text-red-600 transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Remove
                        </motion.button>
                      </div>

                      <p className="mt-2 font-semibold text-red-400">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Checkout Section */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-red-400">
                  Order Total: ${total.toFixed(2)}
                </h3>
                
                <div className="flex gap-4 items-center mt-4">
                  <motion.button
                    onClick={clearCart}
                    className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600 transition text-white shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Cart
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/checkout"
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow-lg"
                    >
                      Proceed to Checkout
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