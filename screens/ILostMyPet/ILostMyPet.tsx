/* eslint-disable import/order */
import {
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormLostMyPet, PictureTaked } from './components';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

const ILostMyPet = () => {
  const { width, height } = useWindowDimensions();
  const [images, setImages] = useState<string[]>([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [positionImage, setPositionImage] = useState(0);

  const deleteImageHandler = (position: number) => {
    setImages(images.filter((_, index) => index !== position));
    setPositionImage(positionImage - 1);
  };

  const pickImage = async (positionImage: number) => {
    setIsLoadingImage(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        if (images.length < 3) {
          setPositionImage(positionImage + 1);
          setImages([...images, result.assets[0].uri]);
        }
      }
    } catch (error) {
      alert(`OCURRIÓ UN ERROR INESPERADO, REINTENTE POR FAVOR, ${error}`);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerBackTitle: 'Volver',
        }}
      />
      <ScrollView style={styles().scroll}>
        <View style={styles(width, height).container}>
          <View style={styles(width).imagesContainer}>
            <View style={styles(width).imagePickerContainer}>
              {isLoadingImage && positionImage === 0 ? (
                <ActivityIndicator size="large" />
              ) : (
                <PictureTaked
                  positionImage={0}
                  deleteImageHandler={deleteImageHandler}
                  image={images[0]}
                  pickImage={pickImage}
                />
              )}
            </View>
            <View style={styles(width).imagePickerContainer}>
              {isLoadingImage && positionImage === 1 ? (
                <ActivityIndicator size="large" />
              ) : (
                <PictureTaked
                  positionImage={1}
                  deleteImageHandler={deleteImageHandler}
                  image={images[1]}
                  pickImage={pickImage}
                />
              )}
            </View>
            <View style={styles(width).imagePickerContainer}>
              {isLoadingImage && positionImage === 2 ? (
                <ActivityIndicator size="large" />
              ) : (
                <PictureTaked
                  positionImage={2}
                  deleteImageHandler={deleteImageHandler}
                  image={images[2]}
                  pickImage={pickImage}
                />
              )}
            </View>
          </View>

          <GestureHandlerRootView>
            <FormLostMyPet />
          </GestureHandlerRootView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ILostMyPet;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    },
    imagePickerContainer: {
      width: width! * 0.25,
      height: width! * 0.25,
      borderWidth: 0.2,
      borderColor: 'gray',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 35,
    },
    imagesContainer: {
      top: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    scroll: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
  });
