/* eslint-disable import/order */
import {
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface PictureTakedProps {
  image?: string;
  handleOpenPicker?: () => void;
  isKeyboardVisible?: boolean;
}
const PictureTaked = ({
  image,
  handleOpenPicker,
  isKeyboardVisible,
}: PictureTakedProps) => {
  const { width, height } = useWindowDimensions();

  return (
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
  );
};

export default PictureTaked;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    imagePicker: {
      width: width! * 0.22,
      height: width! * 0.21,
    },
    cameraIcon: { position: 'absolute', top: -20, right: -12 },
  });
