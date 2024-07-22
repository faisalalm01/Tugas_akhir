/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {createContext, useState, ReactNode, useContext} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (token: string) => {
    // Save token in secure storage
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove token from secure storage
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
