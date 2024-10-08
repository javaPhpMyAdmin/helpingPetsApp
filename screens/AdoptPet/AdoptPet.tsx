/* eslint-disable import/order */
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { RenderItem } from './components';
import { CategoryList } from '@/components';
import { MockedPetsForAdoption } from '@/MockedPetsForAdoption';

const AdoptPet = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles().container}>
        <View style={styles(width).cardContainer}>
          <View style={styles(width).cardInfo}>
            <View style={styles(width).cardImageContainer}>
              <Image
                style={styles(width).cardImage}
                source={require('@/assets/images/golden-pet.jpg')}
              />
            </View>
            <Text style={styles(width, height, loaded).cardText}>
              Adopta a un amigo hoy mismo!
            </Text>
          </View>
          <View style={styles(width).thumbnailContainer}>
            <Image
              source={require('@/assets/images/doberman.webp')}
              style={styles(width, height, loaded).thumbnailImage}
            />
            <Image
              source={require('@/assets/images/buldog.webp')}
              style={styles(width, height, loaded).thumbnailImage}
            />
            <Image
              source={require('@/assets/images/cool-cat.jpg')}
              style={styles(width, height, loaded).thumbnailImage}
            />
            <Image
              source={require('@/assets/images/michi.webp')}
              style={styles(width, height, loaded).thumbnailImage}
            />
          </View>
        </View>
        <CategoryList />
        <View style={styles(width).listContainer}>
          <FlatList
            style={{ paddingHorizontal: 10 }}
            contentContainerStyle={styles(height, width).contentContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={MockedPetsForAdoption}
            renderItem={({ item }) => <RenderItem pet={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdoptPet;

const styles = (width?: number, height?: number, loaded?: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fafafb',
      flex: 1,
      top: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    cardContainer: {
      width: '90%',
      height: width! * 0.6,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 12,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#bc8dab',
      top: 10,
    },
    cardInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: 10,
    },
    cardImageContainer: {
      width: width! * 0.35,
      height: width! * 0.35,
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth: 0.2,
      borderColor: 'orange',
      padding: 7,
      shadowColor: 'orange',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 16,
      backgroundColor: 'transparent',
    },
    cardImage: {
      width: width! * 0.3,
      height: width! * 0.3,
      borderRadius: 100,
    },
    cardText: {
      padding: 7,
      flexShrink: 1,
      color: 'black',
      fontSize: 27,
      fontFamily: loaded ? 'PlaypenSans' : '',
      bottom: 2,
    },
    thumbnailContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: 10,
      bottom: 3,
    },
    thumbnailImage: {
      width: width! * 0.18,
      height: width! * 0.18,
      borderRadius: 100,
    },
    cardPetContainer: {
      width: '100%',
      height: width! * 0.3,
      backgroundColor: 'orange',
      borderRadius: 20,
      borderColor: 'pink',
      borderWidth: 0.4,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginHorizontal: 1,
      shadowColor: '#424040',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 12,
      top: width! * 0.02,
    },
    contentContainer: {
      position: 'static',
    },
    listContainer: {
      top: width! * 0.01,
      height: width! * 1.2,
      display: 'flex',
      justifyContent: 'center',
      right: width! * 0.03,
      paddingTop: 16,
    },
  });
