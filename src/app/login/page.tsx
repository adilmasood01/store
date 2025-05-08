"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setResetMessage(data.message);
      setResetToken(data.resetToken);
      setIsResetPassword(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send reset instructions");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setResetMessage(data.message);
      setTimeout(() => {
        setIsForgotPassword(false);
        setIsResetPassword(false);
        setResetMessage("");
        setResetToken("");
        setNewPassword("");
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to reset password");
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
              {isResetPassword ? "Reset Password" : isForgotPassword ? "Forgot Password" : "Welcome Back"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            {resetMessage && (
              <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-lg text-sm">
                {resetMessage}
              </div>
            )}

            {isResetPassword ? (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label htmlFor="newPassword" className="block text-gray-300 mb-2">
                    New Password
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    id="newPassword"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-all font-semibold"
                >
                  Reset Password
                </motion.button>

                <button
                  type="button"
                  onClick={() => {
                    setIsResetPassword(false);
                    setResetToken("");
                    setNewPassword("");
                  }}
                  className="w-full text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  Back to Forgot Password
                </button>
              </form>
            ) : isForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label htmlFor="resetEmail" className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="resetEmail"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none transition-all"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-all font-semibold"
                >
                  Send Reset Instructions
                </motion.button>

                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="w-full text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  Back to Login
                </button>
              </form>
            ) : (
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

                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="w-full text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  Forgot Password?
                </button>
              </form>
            )}

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

              <div className="mt-6 space-y-4">
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
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-red-400 hover:text-red-300 transition-colors">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
