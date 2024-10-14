/* eslint-disable import/order */
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ImagePicked } from '@/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FormAddNewPet } from './component';

const NewPetScreen = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [positionImage, setPositionImage] = useState(0);

  const { width } = useWindowDimensions();

  const deleteImageHandler = (position: number) => {
    setImages(images.filter((_, index) => index !== position));
    setPositionImage(positionImage - 1);
  };
  const pickImage = async (positionImage: number) => {
    setIsLoadingImage(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#efeeee' }}>
      <ScrollView style={styles({}).scroll}>
        <View style={styles({}).container}>
          <View style={styles({}).imagesContainer}>
            <View style={styles({ width }).imagePickerContainer}>
              {isLoadingImage && positionImage === 0 ? (
                <ActivityIndicator size="large" />
              ) : (
                <ImagePicked
                  positionImage={0}
                  deleteImageHandler={deleteImageHandler}
                  image={images[0]}
                  pickImage={pickImage}
                />
              )}
            </View>
            <View style={styles({ width }).imagePickerContainer}>
              {isLoadingImage && positionImage === 1 ? (
                <ActivityIndicator size="large" />
              ) : (
                <ImagePicked
                  positionImage={1}
                  deleteImageHandler={deleteImageHandler}
                  image={images[1]}
                  pickImage={pickImage}
                />
              )}
            </View>
            <View style={styles({ width }).imagePickerContainer}>
              {isLoadingImage && positionImage === 2 ? (
                <ActivityIndicator size="large" />
              ) : (
                <ImagePicked
                  positionImage={2}
                  deleteImageHandler={deleteImageHandler}
                  image={images[2]}
                  pickImage={pickImage}
                />
              )}
            </View>
          </View>
          <GestureHandlerRootView>
            <FormAddNewPet />
          </GestureHandlerRootView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPetScreen;

interface StylesProps {
  width?: number;
  height?: number;
}

const styles = ({ width, height }: StylesProps) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    },
    imagesContainer: {
      top: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
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
  });
