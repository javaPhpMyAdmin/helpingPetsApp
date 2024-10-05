/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Image,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { categories } from '@/MockedCategories';
import { MockedPets } from '@/MockedPets';
import {
  CategoryItem,
  EditUserButton,
  RenderItem,
  UserProfile,
} from './components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import * as Location from 'expo-location';

export const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isVisible, setIsVisibleModal] = useState(false);
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });
  const [currentPlaceName, setCurrentPlaceName] = useState('');

  const handleOnPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleOpenModal = () => {
    setIsVisibleModal(!isVisible);
  };

  useEffect(() => {
    (async () => {
      const location = await Location.getCurrentPositionAsync({});
      const currentPlace = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      let currentPlaceName = '';
      if (
        currentPlace[0].city! !==
        (Platform.OS === 'ios'
          ? currentPlace[0].region!
          : currentPlace[0].region?.split(' ')[2]!)
      ) {
        currentPlaceName = currentPlace[0].city!.concat(
          ', ',
          Platform.OS === 'ios'
            ? currentPlace[0].region!
            : currentPlace[0].region?.split(' ')[2]!
        );
      }
      currentPlaceName = currentPlace[0].city!;

      setCurrentPlaceName(currentPlaceName ?? '');
    })();
  }, []);

  return (
    <>
      <SafeAreaView style={styles(width, height).container}>
        <View style={styles(width, height).userContainer}>
          <Image
            style={styles(height, width).userInfoAvatar}
            source={require('@/assets/images/random_user.webp')}
          />
          <View style={styles(height, width).userInfoContainer}>
            <View style={styles(height, width).userInfo}>
              <Text style={styles(height, width, loaded).greetUser}>
                Hola Usuario!
              </Text>
              <Text style={styles(height, width, loaded).userName}>
                @usuarioLogueado
              </Text>
              <View style={styles(height, width).locationContainer}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={18}
                  color="red"
                />
                <Text style={styles(height, width, loaded).location}>
                  {currentPlaceName}
                </Text>
              </View>
            </View>
            <EditUserButton handleOpenModal={handleOpenModal} />
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
      <Modal transparent animationType="slide" visible={isVisible}>
        <UserProfile setIsVisibleModal={setIsVisibleModal} />
      </Modal>
    </>
  );
};

const styles = (width: number, height?: number, loaded?: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fafafb',
      height: height! * 0.949,
      top: 2,
    },
    userContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: width * 0.0255,
      height: width * 0.22,
      backgroundColor: 'white',
      borderRadius: 10,
      width: width * 0.95,
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
      right: 2,
      width: width * 0.09,
      height: width * 0.092,
      borderRadius: 10,
    },
    userInfoContainer: {
      marginHorizontal: 4,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    greetUser: {
      fontSize: 23.5,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    userName: {
      fontSize: 15,
      fontFamily: loaded ? 'PlaypenSans' : '',
      bottom: width * 0.0044,
    },
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
    locationContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: 2,
      bottom: 2,
      right: width * 0.005,
      // backgroundColor: 'pink',
    },
    location: { left: 4, bottom: 2, fontFamily: loaded ? 'PlaypenSans' : '' },
    userInfo: {
      flexDirection: 'column',
      gap: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  });
