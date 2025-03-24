/* eslint-disable import/order */
import { createContext, useContext } from 'react';
import { Marker, MarkerLostPet, PetsForAdoptionApi } from '@/types';

interface PetsProps {
  getFavs: () => PetsForAdoptionApi[];
  addToFavs: (pet: PetsForAdoptionApi) => void;
  removeFromFavs: (pet: PetsForAdoptionApi) => void;
  addPet: (pet: Marker & MarkerLostPet) => void;
  getPets: () => any;
  removePet: (pet: Marker & MarkerLostPet) => void;
}

export const PetsContext = createContext<Partial<PetsProps>>({});

export const usePets = () => {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
