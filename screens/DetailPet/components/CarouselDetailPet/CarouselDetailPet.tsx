/* eslint-disable import/order */
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import React from 'react';
import { Pagination } from '../../../DetailAdoptPetScreen/components';
import { ItemCarousel } from '../ItemCarousel';
import { Photo } from '@/types';

interface CarouselDetailPetProps {
  photosUrl: string[] | string;
}

const CarouselDetailPet = ({ photosUrl }: CarouselDetailPetProps) => {
  const { height } = useWindowDimensions();

  return (
    <View style={{ width: '100%', height: height! * 0.5 }}>
      <FlatList
        horizontal
        data={photosUrl as []}
        renderItem={({ item }) => <ItemCarousel photoUrl={item} />}
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
