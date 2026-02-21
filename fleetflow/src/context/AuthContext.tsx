import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  const login = (role: string) => setRole(role);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};