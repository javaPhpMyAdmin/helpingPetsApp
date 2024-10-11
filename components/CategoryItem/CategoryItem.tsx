import { Text, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
// eslint-disable-next-line import/order
import React from 'react';
import { Category } from '@/types';

interface CategoryItemProps {
  item: Category;
  handleOnPress: (category: string) => void;
  selectedCategory: string;
}

const CategoryItem = ({
  item,
  handleOnPress,
  selectedCategory,
}: CategoryItemProps) => {
  const { width, height } = useWindowDimensions();

  const fontScale = useWindowDimensions().fontScale;

  return (
    <Pressable
      style={styles(fontScale, width, height).buttonContainer}
      onPress={() => handleOnPress(item.category)}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles(fontScale, width, height).categoryItem,
            selectedCategory === item.category
              ? styles(fontScale, width, height).selectedCategory
              : null,
          ]}
        >
          {item.category}
        </Text>
      )}
    </Pressable>
  );
};

export default CategoryItem;

const styles = (fontScale: number, width: number, height: number) =>
  StyleSheet.create({
    categoryItem: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: fontScale! < 1 ? 23 : fontScale! > 1 ? 17 : 20,
      marginHorizontal: 12,
      color: 'black',
      opacity: 0.3,
    },
    selectedCategory: {
      color: 'orange',
      fontSize: fontScale! < 1 ? 25 : fontScale! > 1 ? 18 : 22,
      fontWeight: '900',
      opacity: 1,
    },
    buttonContainer: {
      width: width * 0.3,
      height: 30,
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 10,
      opacity: 0.9,
    },
  });
