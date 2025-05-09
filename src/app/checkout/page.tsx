"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const { cartItems, clearCart } = useCart() as { cartItems: CartItem[], clearCart: () => void };
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const totalPrice = cartItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity, 
    0
  );

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) return;

    const confirmOrder = window.confirm("Are you sure you want to place this order?");
    if (confirmOrder) {
      alert("Order placed successfully!");
      clearCart();
      router.push("/");
    }
  }, [cartItems, clearCart, router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-2xl"
        >
          <motion.h1
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-red-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Checkout
          </motion.h1>

          <motion.div
            className="border border-gray-700 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-red-300">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <AnimatePresence>
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-700 p-4 rounded-lg gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-red-300">{item.name}</h3>
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-red-400 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </AnimatePresence>
            )}
            <div className="border-t border-gray-700 mt-6 pt-4">
              <div className="flex justify-between text-lg sm:text-xl font-semibold text-red-400">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="border border-gray-700 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-red-300">Payment Method</h2>
            <div className="space-y-3 sm:space-y-4">
              <motion.label
                whileHover={{ scale: 1.02 }}
                className={`flex items-center p-3 sm:p-4 rounded-lg cursor-pointer transition ${
                  paymentMethod === "card" ? "bg-red-900/20 border-red-400" : "bg-gray-700 border-gray-600"
                } border`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="form-radio h-5 w-5 text-red-400"
                  aria-label="Pay with Credit/Debit Card"
                />
                <span className="ml-3 text-red-300">Credit/Debit Card</span>
              </motion.label>

              <motion.label
                whileHover={{ scale: 1.02 }}
                className={`flex items-center p-3 sm:p-4 rounded-lg cursor-pointer transition ${
                  paymentMethod === "cod" ? "bg-red-900/20 border-red-400" : "bg-gray-700 border-gray-600"
                } border`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="form-radio h-5 w-5 text-red-400"
                  aria-label="Pay with Cash on Delivery"
                />
                <span className="ml-3 text-red-300">Cash on Delivery</span>
              </motion.label>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className={`w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all ${
              cartItems.length === 0 
                ? "bg-gray-600 cursor-not-allowed text-gray-400" 
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            aria-label="Place order"
          >
            Place Order
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Checkout;