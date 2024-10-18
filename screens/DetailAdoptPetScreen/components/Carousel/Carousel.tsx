/* eslint-disable import/order */
import { View, FlatList, useWindowDimensions } from 'react-native';
import React from 'react';
import { ItemCarousel } from '../ItemCarousel';
import { Photo } from '../../../../types';

const data = [
  {
    photoUrl: 'https://picsum.photos/200',
  },
  {
    photoUrl: 'https://picsum.photos/200',
  },
  {
    photoUrl: 'https://picsum.photos/200',
  },
];

interface CarouselProps {
  photosUrl: Photo[];
}

const Carousel = ({ photosUrl }: CarouselProps) => {
  const { height } = useWindowDimensions();
  //   console.log('CAROUSEL PHOTOS', photosUrl);
  //   const data = Array.from(photosUrl);
  return (
    <View style={{ width: '100%', height: height! * 0.5 }}>
      <FlatList
        horizontal
        data={photosUrl}
        renderItem={({ item }) => <ItemCarousel photoUrl={item.uri} />}
        // renderItem={({ item }) => console.log(item.uri)}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </View>
  );
};

export default Carousel;
