/* eslint-disable import/order */
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { usePets } from '@/context';
import { PetForAdoption } from '@/types';

interface RemoveFromFavsProps {
  pet: PetForAdoption;
}

const RemoveFromFavs = ({ pet }: RemoveFromFavsProps) => {
  const { width, height } = useWindowDimensions();
  const { removeFromFavs } = usePets();
  return (
    <TouchableOpacity
      onPress={() => removeFromFavs!(pet)}
      style={styles(width, height).container}
    >
      <Text style={styles().removeText}>Quitar</Text>
    </TouchableOpacity>
  );
};

export default RemoveFromFavs;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: height! * 0.03,
      right: width! * 0.03,
      backgroundColor: 'gray',
      width: width! * 0.2,
      height: width! * 0.1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
    },
    removeText: {
      fontWeight: 'bold',
      fontSize: 17,
      color: 'white',
    },
  });
