





import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  institutionId?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          id: parsedUser._id || parsedUser.id,
          name: parsedUser.name || parsedUser.email?.split("@")[0],
          email: parsedUser.email,
          role: parsedUser.role,
          department:parsedUser.department,
          institutionId:parsedUser.institutionId,
        });
      } catch (err) {
        console.error("Error parsing user:", err);
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};