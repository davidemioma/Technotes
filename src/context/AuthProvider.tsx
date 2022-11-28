import React, { createContext, useContext, useState } from "react";

interface AuthUser {
  accessToken: string;
  username: string;
  roles: string[];
}

interface AuthProps {
  auth: AuthUser | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthProps | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
