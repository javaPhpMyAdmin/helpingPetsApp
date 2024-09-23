/* eslint-disable import/order */
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

interface PictureTakedWrapperProps {
  image: string;
  handleCancelPhoto: () => void;
  isKeyboardVisible: boolean;
}

const PictureTakedWrapper = ({
  image,
  handleCancelPhoto,
  isKeyboardVisible,
}: PictureTakedWrapperProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles(width, height).imageTakedExist}>
      <Image source={{ uri: image }} style={styles().imageTaked} />
      {!isKeyboardVisible && (
        <Pressable onPress={handleCancelPhoto}>
          <View style={styles(width, height).cancelIconContainer}>
            <AntDesign style={{}} name="close" size={40} color="red" />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default PictureTakedWrapper;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    imageTaked: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    imageTakedExist: {
      flex: 1,
      backgroundColor: 'red',
      width: '100%',
      position: 'relative',
      borderRadius: 15,
    },
    cancelIconContainer: {
      position: 'absolute',
      bottom: -height! * 0.034,
      right: width! * 0.41,
      width: width! * 0.15,
      height: width! * 0.14,
      borderRadius: 35,
      backgroundColor: 'gray',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.6,
    },
  });
