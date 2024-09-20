/* eslint-disable import/order */
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  useWindowDimensions,
  Modal,
  Text,
} from 'react-native';
import React, { useState } from 'react';

import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import ReportFoundPetForm from './components/ReportFoundPetForm/ReportFounPetForm';
import {
  CameraWrapper,
  PetPhotoButton,
  PictureTakedWrapper,
} from './components';

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const FoundAPet = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null | undefined>(null);
  const { width, height } = useWindowDimensions();

  const handleOpenCamera = () => {
    setShowCamera(true);
  };
  const handleCancelPhoto = () => {
    setImage(null);
  };

  // if (!permission) {
  //   return <Text>No tienes permisos para usar la cámara</Text>;
  // }

  // if (!permission.granted) {
  //   return <Text>No tienes permisos para usar la cámara</Text>;
  // }
  return (
    <KeyboardAvoidingView behavior={BEHAVIOR} style={styles().container}>
      <Stack.Screen
        options={{
          headerBackVisible: true,
        }}
      />
      {!showCamera ? (
        <GestureHandlerRootView>
          <TouchableWithoutFeedback
            style={styles().touchableContainer}
            onPress={() => Keyboard.dismiss()}
          >
            <View
              style={
                !image
                  ? styles(width, height).imageContainer
                  : styles(width, height).imageTakedContainer
              }
            >
              {!image ? (
                <PetPhotoButton handleOpenCamera={handleOpenCamera} />
              ) : (
                <PictureTakedWrapper
                  image={image}
                  handleCancelPhoto={handleCancelPhoto}
                />
              )}
            </View>
            <ReportFoundPetForm />
          </TouchableWithoutFeedback>
        </GestureHandlerRootView>
      ) : (
        <CameraWrapper setShowCamera={setShowCamera} setImage={setImage} />
      )}
    </KeyboardAvoidingView>
  );
};

export default FoundAPet;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    imageContainer: {
      width: width! * 0.35,
      height: height! * 0.16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 0.2,
      borderColor: 'gray',
    },
    cameraIcon: { position: 'absolute', top: -20, right: -12 },
    touchableContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      height: '100%',
      alignItems: 'center',
    },

    imageTakedContainer: {
      width: '100%',
      height: 270,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 0.2,
      borderColor: 'gray',
    },
  });
