import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RenderItem } from './components';

import { categories } from '@/MockedCategories';
import { MockedPets } from '@/MockedPets';

export const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const handleOnPress = (category: string) => {
    setSelectedCategory(category);
  };
  const ndate = new Date();
  return (
    <SafeAreaView style={styles(width, height).container}>
      {/* <Text style={styles().title}>Ultimos registros</Text> */}
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
          <View style={{ left: width * 0.2 }}>
            <Pressable style={styles(height, width).editUserButton}>
              <MaterialCommunityIcons
                name="circle-edit-outline"
                size={34}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles(height, width).horizontalFlatlist}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 12,
            position: 'static',
          }}
          keyExtractor={(item) => item.id}
          data={categories}
          horizontal
          style={{ paddingVertical: 5, position: 'static' }}
          renderItem={({ item }) => (
            <Pressable
              style={{
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
              }}
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
          )}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={MockedPets}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        ListHeaderComponentStyle={{ marginVertical: 10 }}
        // ListHeaderComponent={() => (

        // )}
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
    title: {
      fontSize: 34,
      marginHorizontal: 20,
      color: '#323232',
      fontWeight: 'bold',
    },
    categoryItem: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: 12,
      color: 'black',
      opacity: 0.3,
    },
    selectedCategory: {
      color: 'orange',
      fontSize: 22,
      fontWeight: '900',
      opacity: 1,
    },
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
    editUserButton: {
      width: 40,
      height: 40,
      borderColor: 'lightgray',
      borderWidth: 0.8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      right: 1,
    },
    horizontalFlatlist: {
      top: width * 0.015,
      height: width * 0.065,
      display: 'flex',
      justifyContent: 'center',
    },
  });
