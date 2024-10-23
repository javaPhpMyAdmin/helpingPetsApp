/* eslint-disable import/order */
import React, { useState } from 'react';
import { PetsContext } from '../PetsContext/PetsContext';
import { Marker, PetForAdoption } from '@/types';
import { MockedPets } from '@/MockedPets';

const PetsProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [favsPets, setFavsPets] = useState<PetForAdoption[]>([]);
  const [pets, setPets] = useState<Marker[]>(MockedPets);

  const getFavsPets = () => {
    return favsPets;
  };
  const addToFavs = (pet: PetForAdoption) => {
    setFavsPets([...favsPets, pet]);
  };

  const removeFromFavs = (pet: PetForAdoption) => {
    setFavsPets(favsPets.filter((petToRemove) => petToRemove.id !== pet.id));
  };

  const addPet = (pet: Marker) => {
    setPets([...pets, pet]);
  };

  const value = {
    getFavs: getFavsPets,
    addToFavs,
    removeFromFavs,
    addPet,
    pets,
  };
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};

export default PetsProvider;
