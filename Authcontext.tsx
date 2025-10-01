import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: string | null;
  password: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const login = (username: string, password: string) => {
    setUser(username);
    setPassword(password);
  };
  const logout = () => {
    setUser(null)
  };
  const value = { user, password, login, logout  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
    
  );
}

export function useAuth(){
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used withing an auth context');
    }
    return context;
}