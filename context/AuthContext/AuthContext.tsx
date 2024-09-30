/* eslint-disable import/order */
import { createContext, useContext } from 'react';
import { AuthState } from '../types';

interface AuthProps {
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  authState: AuthState;
}

export const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
