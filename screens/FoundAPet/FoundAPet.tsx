/* eslint-disable import/order */
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import ReportFoundPetForm from './components/ReportFoundPetForm/ReportFoundPetForm';
import {
  CameraWrapper,
  PetPhotoButton,
  PictureTakedWrapper,
} from './components';
import Animated, { FadeIn } from 'react-native-reanimated';

const FoundAPet = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null | undefined>(null);
  const { width, height } = useWindowDimensions();
  const [isKeyboardVisble, setIsKeyboardVisible] = useState(false);

  const handleOpenCamera = () => {
    setShowCamera(true);
  };
  const handleCancelPhoto = () => {
    setImage(null);
  };

  //TODO: ONLY FOR TEST CAMERA ON IOS DEVICE
  // useEffect(() => {
  //   if (Platform.OS === 'ios')
  //     setImage(
  //       'https://elcomercio.pe/resizer/o1iGvdjwZ7uyfm32ap0mZqVyY4Q=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/JJIAPKY5HFEI5DFMOGVYNXCBCE.jpg'
  //     );
  // }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: true,
        }}
      />
      <GestureHandlerRootView>
        <View style={styles(width, height).container}>
          {!showCamera && (
            <>
              <Animated.View
                entering={FadeIn.duration(500).damping(3).springify()}
                style={
                  !image
                    ? styles(width, height).imageContainer
                    : isKeyboardVisble
                      ? styles(width, height).isKeyboardVisible
                      : styles(width, height).imageTakedContainer
                }
              >
                {!image ? (
                  <PetPhotoButton handleOpenCamera={handleOpenCamera} />
                ) : (
                  <PictureTakedWrapper
                    isKeyboardVisible={isKeyboardVisble}
                    image={image}
                    handleCancelPhoto={handleCancelPhoto}
                  />
                )}
              </Animated.View>
              <ReportFoundPetForm setIsKeyboardVisible={setIsKeyboardVisible} />
            </>
          )}
        </View>
        {showCamera && (
          <CameraWrapper setShowCamera={setShowCamera} setImage={setImage} />
        )}
      </GestureHandlerRootView>
    </>
  );
};

export default FoundAPet;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageContainer: {
      width: width! * 0.4,
      height: height! * 0.17,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 0.2,
      borderColor: 'gray',
      top: 10,
    },
    imageTakedContainer: {
      width: width! * 0.96,
      height: width! * 0.6,
      top: 10,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 0.2,
      borderColor: 'gray',
    },
    isKeyboardVisible: {
      bottom: 5,
      width: width! * 0.96,
      height: width! * 0.3,
      padding: 10,
    },
  });
