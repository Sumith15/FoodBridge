// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// interface User {
//   id: string;
//   name: string;
//   role: "donor" | "agent" | "receiver";
//   organization?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check for existing session on load
//   useEffect(() => {
//     const storedUser = localStorage.getItem("foodbridge_user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem("foodbridge_user", JSON.stringify(userData));
    
//     // Redirect logic based on role
//     if (userData.role === "receiver") navigate("/admin"); // Receiver Dashboard
//     else if (userData.role === "agent") navigate("/volunteer");
//     else navigate("/donor");
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("foodbridge_user");
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };


import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  id: string;
  _id?: string; // <--- ADDED THIS: Fixes the error in NourishGarden
  name: string;
  role: "donor" | "agent" | "receiver";
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("foodbridge_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("foodbridge_user", JSON.stringify(userData));
    
    // Redirect logic based on role
    if (userData.role === "receiver") navigate("/admin"); // Receiver Dashboard
    else if (userData.role === "agent") navigate("/volunteer");
    else navigate("/donor");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("foodbridge_user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};