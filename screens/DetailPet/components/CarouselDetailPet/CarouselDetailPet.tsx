/* eslint-disable import/order */
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import React from 'react';
import { Pagination } from '../../../DetailAdoptPetScreen/components';
import { ItemCarousel } from '../ItemCarousel';
import { Photo } from '@/types';

interface CarouselDetailPetProps {
  photosUrl: Photo[];
}

const CarouselDetailPet = ({ photosUrl }: CarouselDetailPetProps) => {
  const { height } = useWindowDimensions();

  return (
    <View
      style={{ width: '100%', height: height! * 0.5, backgroundColor: 'red' }}
    >
      <FlatList
        horizontal
        data={photosUrl}
        renderItem={({ item }) => <ItemCarousel photoUrl={item.uri} />}
        keyExtractor={(item, index) => item + index.toString()}
        pagingEnabled
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // onScroll={onScrollHandler}
      />
      {/* <Pagination
        scrollX={scrollX}
        paginationIndex={paginationIndex}
        items={photosUrl}
      /> */}
    </View>
  );
};

export default CarouselDetailPet;
