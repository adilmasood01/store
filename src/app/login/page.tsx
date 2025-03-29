"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
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
          {/* Logo or Brand Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8"
          >
            <Image
              src="/logo.png" // Update with your logo path
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
              Welcome Back
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                Sign In
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-red-400 hover:text-red-300 text-sm transition-colors pointer-events-none">
                Forgot Password?
              </a>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="w-full bg-gray-700 text-white py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                >
                  <Image
                    src="/google.jpg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span>Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="w-full bg-gray-700 text-white py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                >
                  <Image
                    src="/github.jpg"
                    alt="GitHub"
                    width={20}
                    height={20}
                  />
                  <span>GitHub</span>
                </motion.button>
              </div>
            </div>

            <p className="mt-8 text-center text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-red-400 hover:text-red-300 transition-colors pointer-events-none">
                Sign up
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;