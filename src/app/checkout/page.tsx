"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-black">Checkout</h1>

      <div className="border p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-600">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-2 text-blue-400">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-blue-400">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="border p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-600">Payment Method</h2>
        <label className="flex items-center mb-2 text-blue-400">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            className="mr-2"
            aria-label="Pay with Credit/Debit Card"
          />
          Credit/Debit Card
        </label>
        <label className="flex items-center text-blue-400">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
            className="mr-2"
            aria-label="Pay with Cash on Delivery"
          />
          Cash on Delivery
        </label>
      </div>

      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className={`w-full py-3 rounded-md transition 
          ${cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        aria-label="Place order"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
