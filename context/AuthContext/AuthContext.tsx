/* eslint-disable import/order */
import { createContext, useContext } from 'react';
import { AuthState } from '../types';

interface AuthProps {
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  onSignIn: (
    username: string,
    password: string,
    confirmPassword: string
  ) => void;
  authState: AuthState;
}

export const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
