/* eslint-disable import/order */
import { createContext, useContext } from 'react';
import { Marker, PetForAdoption } from '@/types';

interface PetsProps {
  getFavs: () => PetForAdoption[];
  addToFavs: (pet: PetForAdoption) => void;
  removeFromFavs: (pet: PetForAdoption) => void;
  pets: Marker[];
  addPet: (pet: Marker) => void;
  // removePet: (pet: PetForAdoption) => void;
}

export const PetsContext = createContext<Partial<PetsProps>>({});

export const usePets = () => {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
