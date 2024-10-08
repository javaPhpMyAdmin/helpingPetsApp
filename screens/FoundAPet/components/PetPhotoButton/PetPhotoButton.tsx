/* eslint-disable import/order */
import {
  Pressable,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PetPhotoButton = ({
  handleOpenCamera,
}: {
  handleOpenCamera: () => void;
}) => {
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity onPress={handleOpenCamera}>
      <Image
        source={require('@/assets/images/paw.png')}
        style={styles(width, height).imagePicker}
      />
      <Ionicons
        style={styles().cameraIcon}
        name="camera"
        size={30}
        color="gray"
      />
    </TouchableOpacity>
  );
};

export default PetPhotoButton;
const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    imagePicker: {
      width: width! * 0.25,
      height: width! * 0.24,
    },
    cameraIcon: { position: 'absolute', top: -20, right: -12 },
  });
