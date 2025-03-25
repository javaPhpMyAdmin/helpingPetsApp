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
  return (
    <Pressable
      style={styles(width, height).buttonContainer}
      onPress={() => handleOnPress(item.category)}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles(width, height).categoryItem,
            selectedCategory === item.category
              ? styles(width, height).selectedCategory
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

const styles = (width: number, height: number) =>
  StyleSheet.create({
    categoryItem: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 15,
      marginHorizontal: 12,
      color: 'black',
      opacity: 0.3,
    },
    selectedCategory: {
      color: 'orange',
      fontSize: 18,
      fontWeight: '900',
      opacity: 1,
    },
    buttonContainer: {
      width: width * 0.35,
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
