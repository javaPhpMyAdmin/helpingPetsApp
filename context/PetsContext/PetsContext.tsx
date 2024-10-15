/* eslint-disable import/order */
import { createContext, useContext } from 'react';
import { PetForAdoption } from '../../types';

interface PetsProps {
  getFavs: () => PetForAdoption[];
  addToFavs: (pet: PetForAdoption) => void;
  removeToFavs: (pet: PetForAdoption) => void;
}

export const PetsContext = createContext<Partial<PetsProps>>({});

export const usePets = () => {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
