"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

type User = {
  _id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setUser(data.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setUser(data.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    clearCart();
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
