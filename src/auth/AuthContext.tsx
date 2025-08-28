import React, { createContext, useContext, useMemo, useState } from "react";
import perfilAvatar from "../assets/img/perfilAvatar.jpg"

type User = {
  id: number;
  nombre: string;
  email: string;
  rol: "admin" | "Ejecutiva de ventas" | "visor";
  AvatarUrl?: string
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: Array<User & { password: string }> = [
  {
    id: 1,
    nombre: "Jane Doe",
    email: "demo@crm.com",
    rol: "Ejecutiva de ventas",
    password: "Demo2025!",
    AvatarUrl: perfilAvatar,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const found = DEMO_USER.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) throw new Error("Credenciales inválidas");
    const { password: _omit, ...safeUser } = found;
    setUser(safeUser);
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};