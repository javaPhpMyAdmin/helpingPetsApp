/* eslint-disable import/order */
import { useEffect, useState } from 'react';
import {
  getRandomCardInfo,
  PetsForCardInfo,
} from '@/utils/generateRandomCardInfo';

const INITIAL_RANDOM_PET_FOR_CARD_INFO: PetsForCardInfo = {
  image: '',
  title: '',
  gender: '',
  breed: '',
  age: '',
};

const useRandomPet = () => {
  const [currentPet, setCurrentPet] = useState<PetsForCardInfo>(
    INITIAL_RANDOM_PET_FOR_CARD_INFO
  );

  useEffect(() => {
    const currentPetInfoCard = getRandomCardInfo();
    setCurrentPet(currentPetInfoCard);
  }, []);
  return currentPet;
};

export default useRandomPet;
