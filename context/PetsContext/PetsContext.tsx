/* eslint-disable import/order */
import { createContext, useContext } from 'react';
import { Marker, MarkerLostPet, PetForAdoption } from '@/types';

interface PetsProps {
  getFavs: () => PetForAdoption[];
  addToFavs: (pet: PetForAdoption) => void;
  removeFromFavs: (pet: PetForAdoption) => void;
  pets: Marker[] & MarkerLostPet[];
  addPet: (pet: Marker & MarkerLostPet) => void;
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
