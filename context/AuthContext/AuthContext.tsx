/* eslint-disable import/order */
import { createContext, useContext } from 'react';
import { AuthState, UserContext } from '../types';

interface AuthProps {
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  onSignIn: (
    username: string,
    password: string,
    confirmPassword: string
  ) => void;
  authState: boolean;
  setAuthState: (value: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  accessToken: string;
  currentUser: UserContext;
  setCurrentUser: (user: UserContext) => void;
}

export const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
