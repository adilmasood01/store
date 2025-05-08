"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="rounded-full bg-gray-700 p-4 shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-red-400 mb-8 text-center">
              Create Account
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-all font-semibold"
              >
                Sign Up
              </motion.button>
            </form>

            <p className="mt-8 text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-red-400 hover:text-red-300 transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
