/* eslint-disable import/order */
import { View, FlatList, useWindowDimensions, ViewToken } from 'react-native';
import React, { useRef, useState } from 'react';
import { ItemCarousel } from '../ItemCarousel';
import { Pagination } from '../Pagination';
import { useSharedValue } from 'react-native-reanimated';

interface CarouselProps {
  photosUrl: string[];
}

const Carousel = ({ photosUrl }: CarouselProps) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const { height } = useWindowDimensions();
  const scrollX = useSharedValue(0);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={{ width: '100%', height: height! * 0.5 }}>
      <FlatList
        horizontal
        data={photosUrl}
        renderItem={({ item }) => <ItemCarousel photoUrl={item} />}
        keyExtractor={(item, index) => item + index.toString()}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // onScroll={onScrollHandler}
      />
      <Pagination
        scrollX={scrollX}
        paginationIndex={paginationIndex}
        items={photosUrl}
      />
    </View>
  );
};

export default Carousel;
