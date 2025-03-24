/* eslint-disable import/order */
import React, { useState } from 'react';
import { PetsContext } from '../PetsContext/PetsContext';
import { Marker, MarkerLostPet, PetForAdoption } from '@/types';
import { MockedPets } from '@/MockedPets';
import { useAuth } from '../AuthContext/AuthContext';

const PetsProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [favsPets, setFavsPets] = useState<PetForAdoption[]>([]);
  const [pets, setPets] = useState<Marker[] & MarkerLostPet[]>(
    MockedPets as Marker[] & MarkerLostPet[]
  );
  const { accessToken } = useAuth();

  const orderPetsByDate = (pets: Marker[] & MarkerLostPet[]) => {
    return pets.sort((a, b) => {
      const petB = new Date(b.createdAt);
      const petA = new Date(a.createdAt);
      return petA.getTime() - petB.getTime();
    });
  };

  const getPets = async () => {
    const response = await fetch(
      'http://localhost:8082/api/v1/reports?page=0&size=100',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log('DATA PROVIDER', data.result.Result.content);
    return data.result.Result.content;
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

  const removePet = (pet: Marker & MarkerLostPet) => {
    const sortedPets = orderPetsByDate(
      pets.filter((petToRemove) => petToRemove.id !== pet.id)
    );
    setPets(sortedPets);
  };

  const value = {
    getFavs: getFavsPets,
    addToFavs,
    removeFromFavs,
    addPet,
    getPets,
    removePet,
  };
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};

export default PetsProvider;
