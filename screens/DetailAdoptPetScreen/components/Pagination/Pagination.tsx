// /* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Photo } from '@/types';

interface PaginationProps {
  scrollX: SharedValue<number>;
  paginationIndex: number;
  items: Photo[];
}

const Pagination = ({ scrollX, paginationIndex, items }: PaginationProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles().container}>
      {items.map((_, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const pgAnimationStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP
          );
          return {
            width: dotWidth,
          };
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles().dot,
              //   pgAnimationStyle,
              {
                backgroundColor: paginationIndex === index ? 'white' : 'black',
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
// renderItem={({ item }) => console.log(item.uri)}
const styles = () =>
  StyleSheet.create({
    container: {
      width: 70,
      flexDirection: 'row',
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      top: 300,
      right: 160,
    },
    textInformation: {
      color: 'gray',
      fontSize: 20,
      fontWeight: 'bold',
    },
    dot: {
      backgroundColor: 'red',
      height: 12,
      width: 12,
      borderRadius: 32,
      marginHorizontal: 5,
    },
  });
