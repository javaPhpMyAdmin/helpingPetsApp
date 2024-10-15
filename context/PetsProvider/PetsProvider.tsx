/* eslint-disable import/order */
import React, { useState } from 'react';
import { PetsContext } from '../PetsContext/PetsContext';
import { PetForAdoption } from '@/types';
import { MockedPetsForAdoption } from '../../MockedPetsForAdoption';

const initialFavsPets: PetForAdoption[] = MockedPetsForAdoption.slice(0, 3);

const PetsProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [favsPets, setFavsPets] = useState<PetForAdoption[]>(initialFavsPets);

  const getFavsPets = () => {
    return favsPets;
  };
  const addToFavs = (pet: PetForAdoption) => {
    setFavsPets([...favsPets, pet]);
  };

  const removeFromFavs = (pet: PetForAdoption) => {
    setFavsPets(favsPets.filter((petToRemove) => petToRemove.id !== pet.id));
  };

  const value = {
    getFavs: getFavsPets,
    addToFavs,
    removeFromFavs,
  };
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};

export default PetsProvider;
