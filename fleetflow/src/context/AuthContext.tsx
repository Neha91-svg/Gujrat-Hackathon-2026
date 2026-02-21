import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

/* ================= TYPES ================= */

export type Role = "Manager" | "Dispatcher" | "Safety" | "Finance";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => Promise<void>;
  logout: () => void;
}

/* ================= AXIOS CONFIG ================= */

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= CONTEXT ================= */

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("fleetflowUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  /* ================= LOGIN ================= */

  const login = async ({ email, password }: { email: string; password: string }) => {
    const res = await API.post("/auth/login", { email, password });

    const { user, token } = res.data;

    localStorage.setItem("token", token);

    const userData: User = {
      id: user.id, // backend me id return ho raha hai
      name: user.name,
      email: user.email,
      role: user.role,
    };

    localStorage.setItem("fleetflowUser", JSON.stringify(userData));
    setUser(userData);
  };

  /* ================= REGISTER ================= */

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => {
    await API.post("/auth/register", data);
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fleetflowUser");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};