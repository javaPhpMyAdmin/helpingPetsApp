/* eslint-disable import/order */
import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface ImagePickedProps {
  image: string;
  pickImage: (positionImage: number) => void;
  deleteImageHandler: (position: number) => void;
  positionImage: number;
}

const ImagePicked = ({
  image,
  pickImage,
  deleteImageHandler,
  positionImage,
}: ImagePickedProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <>
      {!image ? (
        <TouchableOpacity onPress={() => pickImage(positionImage)}>
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
        <>
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
        </>
      )}
    </>
  );
};

export default ImagePicked;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    imagePicker: {
      width: width! * 0.22,
      height: width! * 0.21,
    },
    cameraIcon: { position: 'absolute', top: -20, right: -12 },
    hasImage: {
      width: width! * 0.25,
      height: width! * 0.25,
      borderRadius: 15,
    },
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
