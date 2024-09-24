/* eslint-disable import/order */
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface PictureTakedProps {
  image?: string;
  handleOpenPicker?: () => void;
  deleteImageHandler: (position: number) => void;
  positionImage: number;
}

const PictureTaked = ({
  image,
  handleOpenPicker,
  deleteImageHandler,
  positionImage,
}: PictureTakedProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <>
      {!image ? (
        <TouchableOpacity onPress={handleOpenPicker}>
          <Image
            source={require('@/assets/images/paw.png')}
            style={styles(width, height).imagePicker}
          />
          <Ionicons
            style={styles().cameraIcon}
            name="camera"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles(width, height).hasImageContainer}>
          <Image
            source={{ uri: image }}
            style={styles(width, height).hasImage}
          />
          <TouchableOpacity
            onPress={() => deleteImageHandler(positionImage)}
            style={styles(width, height).deleteButton}
          >
            <MaterialIcons name="delete-forever" size={54} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PictureTaked;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    imagePicker: {
      width: width! * 0.22,
      height: width! * 0.21,
    },
    hasImageContainer: {
      width: width! * 0.25,
      height: width! * 0.25,
      borderRadius: 15,
      position: 'relative',
    },
    hasImage: {
      width: width! * 0.25,
      height: width! * 0.25,
      borderRadius: 15,
    },
    cameraIcon: { position: 'absolute', top: -20, right: -12 },
    deleteButton: {
      position: 'absolute',
      top: height! * 0.09,
      right: -12,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
