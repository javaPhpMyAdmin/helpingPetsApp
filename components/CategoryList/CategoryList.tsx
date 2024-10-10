/* eslint-disable import/order */
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { categories } from '@/MockedCategories';
import { CategoryItem } from '../CategoryItem';

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { width, height } = useWindowDimensions();

  const handleOnPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles(height, width).horizontalFlatlist}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles(height, width).contentContainer}
        keyExtractor={(item) => item.id}
        data={categories}
        horizontal
        style={styles(height, width).categoryButton}
        renderItem={({ item }) => (
          <CategoryItem
            handleOnPress={handleOnPress}
            selectedCategory={selectedCategory}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = (width: number, height?: number, loaded?: boolean) =>
  StyleSheet.create({
    horizontalFlatlist: {
      top: width * 0.025,
      height: width * 0.065,
      display: 'flex',
      justifyContent: 'center',
    },
    categoryButton: { paddingVertical: 5, position: 'static' },

    contentContainer: {
      gap: 10,
      paddingHorizontal: 12,
      position: 'static',
    },
  });