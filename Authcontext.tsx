import React, { createContext, useContext, useState } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface User {
    user_id: String;
    name: String;
    email: String;
    phonenumber: String;
    is_owner: Boolean;
    rating: Float;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const login = (user: User) => {
    setUser(user)
  };
  const logout = () => {
    setUser(null)
  };
  const value = { user, login, logout  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
    
  );
}

export {User}

export function useAuth(){
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used withing an auth context');
    }
    return context;
}