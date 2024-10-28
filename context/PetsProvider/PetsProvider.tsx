/* eslint-disable import/order */
import React, { useState } from 'react';
import { PetsContext } from '../PetsContext/PetsContext';
import { Marker, MarkerLostPet, PetForAdoption } from '@/types';
import { MockedPets } from '@/MockedPets';

const PetsProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [favsPets, setFavsPets] = useState<PetForAdoption[]>([]);
  const [pets, setPets] = useState<Marker[] & MarkerLostPet[]>(
    MockedPets as Marker[] & MarkerLostPet[]
  );

  const orderPetsByDate = (pets: Marker[] & MarkerLostPet[]) => {
    return pets.sort((a, b) => {
      const petB = new Date(b.createdAt);
      const petA = new Date(a.createdAt);
      return petB.getTime() - petA.getTime();
    });
  };

  const getFavsPets = () => {
    return favsPets;
  };
  const addToFavs = (pet: PetForAdoption) => {
    setFavsPets([...favsPets, pet]);
  };

  const removeFromFavs = (pet: PetForAdoption) => {
    setFavsPets(favsPets.filter((petToRemove) => petToRemove.id !== pet.id));
  };

  const addPet = (pet: Marker & MarkerLostPet) => {
    const sortedPets = orderPetsByDate([...pets, pet]);
    setPets(sortedPets);
  };

  const value = {
    getFavs: getFavsPets,
    addToFavs,
    removeFromFavs,
    addPet,
    pets: orderPetsByDate(pets),
  };
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};

export default PetsProvider;
