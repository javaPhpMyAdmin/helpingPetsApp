/* eslint-disable import/order */
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { usePets } from '@/context';
import { PetForAdoption } from '@/types';

interface MarkFavProps {
  pet: PetForAdoption;
}

const MarkFav = ({ pet }: MarkFavProps) => {
  const { width } = useWindowDimensions();
  const { getFavs, addToFavs, removeFromFavs } = usePets();
  const favsPets = getFavs!();

  return (
    <>
      {favsPets.includes(pet) ? (
        <TouchableOpacity
          onPress={() => removeFromFavs!(pet)}
          style={styles({ width }).favouriteIcon}
        >
          <MaterialIcons name="favorite" size={34} color="red" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => addToFavs!(pet)}
          style={styles({ width }).favouriteIcon}
        >
          <MaterialIcons name="favorite-border" size={34} color="red" />
        </TouchableOpacity>
      )}
    </>
  );
};

export default MarkFav;

interface StylesProps {
  width?: number;
}

const styles = ({ width }: StylesProps) =>
  StyleSheet.create({
    favouriteIcon: { position: 'absolute', left: width! * 0.8, top: 0 },
  });
