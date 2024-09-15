/* eslint-disable import/order */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { categories } from '@/MockedCategories';
import { MockedPets } from '@/MockedPets';
import { CategoryItem, EditUserButton, RenderItem } from './components';

export const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const ndate = new Date();

  const handleOnPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles(width, height).container}>
      <View style={styles(width, height).userContainer}>
        <Image
          style={styles(height, width).userInfoAvatar}
          source={require('@/assets/images/random_user.webp')}
        />
        <View style={styles(height, width).userInfoContainer}>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text style={styles(height, width).greetUser}>Hola Usuario!</Text>
            <Text style={styles(height, width).userName}>@usuarioLogueado</Text>
            <Text style={styles(height, width).location}>
              {ndate.toLocaleString()}
            </Text>
          </View>
          <EditUserButton />
        </View>
      </View>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={MockedPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = (width: number, height?: number) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fafafb',
      height: height! * 0.949,
      top: 2,
    },
    // title: {
    //   fontSize: 34,
    //   marginHorizontal: 20,
    //   color: '#5a61f1',
    //   fontWeight: 'bold',
    // },
    userContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: 16,
      height: width * 0.22,
      backgroundColor: 'white',
      borderRadius: 10,
      width: width * 0.93,
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 9,
      top: 2,
    },
    userInfoAvatar: {
      marginHorizontal: 6,
      width: width * 0.09,
      height: width * 0.092,
      borderRadius: 10,
    },
    userInfoContainer: {
      marginHorizontal: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    greetUser: {
      fontSize: 25,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    userName: { fontSize: 13, fontWeight: '400' },
    location: { fontSize: 13, fontWeight: '400', top: 2 },
    categoryButton: { paddingVertical: 5, position: 'static' },
    horizontalFlatlist: {
      top: width * 0.015,
      height: width * 0.065,
      display: 'flex',
      justifyContent: 'center',
    },
    contentContainer: {
      gap: 10,
      paddingHorizontal: 12,
      position: 'static',
    },
  });
