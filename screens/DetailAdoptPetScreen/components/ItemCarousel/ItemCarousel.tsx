/* eslint-disable import/order */
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';

interface ItemCarouselProps {
  photoUrl: string;
}

const ItemCarousel = ({ photoUrl }: ItemCarouselProps) => {
  const { width, height } = useWindowDimensions();
  console.log({ photoUrl });
  return (
    <Image
      source={{ uri: photoUrl }}
      style={styles({ width, height }).imagePet}
    />
  );
};

export default ItemCarousel;

interface StylesProps {
  height?: number;
  width?: number;
}

const styles = ({ height, width }: StylesProps) =>
  StyleSheet.create({
    imagePet: {
      width,
      height: '100%',
      objectFit: 'cover',
    },
  });
