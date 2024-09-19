/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Slider from '@react-native-community/slider';

import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const FoundAPet = () => {
  const [image, setImage] = useState<string | null | undefined>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, setPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<CameraView>(null);

  const { width, height } = useWindowDimensions();

  const handleTitleInfo = () => {};
  const handleDescriptionInfo = () => {};
  const handleSubmitReport = () => {};
  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
        quality: 1,
        exif: false,
      });
      setImage(photo?.uri);
      setShowCamera(false);
    }
  };
  const handleOpenCamera = () => {
    setShowCamera(true);
  };
  const handleCancelPhto = () => {
    setImage(null);
  };
  const handleZoom = (value: number) => {
    setZoom(value);
  };

  // if (!permission) {
  //   return <Text>No tienes permisos para usar la cámara</Text>;
  // }

  // if (!permission.granted) {
  //   return <Text>No tienes permisos para usar la cámara</Text>;
  // }
  return (
    <KeyboardAvoidingView behavior={BEHAVIOR} style={styles().container}>
      {!showCamera ? (
        <GestureHandlerRootView>
          <TouchableWithoutFeedback
            style={styles().touchableContainer}
            onPress={() => Keyboard.dismiss()}
          >
            <View
              style={
                !image ? styles().imageContainer : styles().imageTakedContainer
              }
            >
              {!image ? (
                <Pressable onPress={handleOpenCamera}>
                  <Image
                    source={require('@/assets/images/paw.png')}
                    style={styles().imagePicker}
                  />
                  <Ionicons
                    style={styles().cameraIcon}
                    name="camera"
                    size={30}
                    color="gray"
                  />
                </Pressable>
              ) : (
                <View style={styles(width, height).imageTakedExist}>
                  <Image source={{ uri: image }} style={styles().imageTaked} />
                  <Pressable onPress={handleCancelPhto}>
                    <View style={styles(width, height).cancelIconContainer}>
                      <AntDesign
                        style={{}}
                        name="close"
                        size={50}
                        color="red"
                      />
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles().titleContainer}>
              <View style={styles().descriptionAndTitleContainer}>
                <Text style={styles().titleText}>Título</Text>
                <View style={styles().iconInfo}>
                  <Pressable onPress={() => handleTitleInfo}>
                    <FontAwesome6 name="info" size={15} color="orange" />
                  </Pressable>
                </View>
              </View>
              <TextInput
                style={styles().titleInput}
                placeholder="Ingrese un título"
              />
            </View>
            <View style={styles().descriptionContainer}>
              <View style={styles().descriptionAndTitleContainer}>
                <Text style={styles().descriptionText}>Descripción</Text>
                <View style={styles().iconInfo}>
                  <Pressable onPress={() => handleDescriptionInfo}>
                    <FontAwesome6 name="info" size={15} color="orange" />
                  </Pressable>
                </View>
              </View>
              <TextInput
                style={styles().descriptionInput}
                multiline
                numberOfLines={5}
                placeholder="Ingrese una descripción"
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', top: 5 }}>
              <Pressable
                style={styles().buttonContainer}
                onPress={handleSubmitReport}
              >
                <Entypo name="check" size={60} color="white" />
                <Text style={styles().buttonText}>Reportar</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </GestureHandlerRootView>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            zIndex: 10,
            position: 'relative',
          }}
        >
          <CameraView
            ref={cameraRef}
            facing={facing}
            style={styles().cameraView}
            zoom={zoom}
          >
            <View style={styles().row}>
              <Text style={styles().textZoom}>Zoom: {zoom.toFixed(1)}</Text>
              <Slider
                style={styles().slider}
                value={zoom}
                onValueChange={handleZoom}
                minimumValue={0}
                maximumValue={1}
              />
            </View>
            <Pressable
              style={styles(width, height).takePhoto}
              onPress={takePhoto}
            >
              <Ionicons name="camera" size={100} color="gray" />
            </Pressable>
            <Pressable
              style={styles(width, height).cancelTakePhoto}
              onPress={() => setShowCamera(false)}
            >
              <AntDesign name="close" size={100} color="red" />
            </Pressable>
          </CameraView>
        </View>
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
      width: 140,
      height: 140,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 0.2,
      borderColor: 'gray',
    },
    imagePicker: {
      width: 120,
      height: 120,
    },
    titleContainer: {
      width: 370,
      height: 90,
      // backgroundColor: 'orange',
      justifyContent: 'space-evenly',
    },
    titleText: {
      fontSize: 20,
    },
    titleInput: {
      backgroundColor: 'white',
      width: '100%',
      height: '60%',
      borderRadius: 10,
      borderWidth: 0.3,
      borderColor: 'gray',
      paddingLeft: 10,
    },
    descriptionContainer: {
      width: 370,
      height: 200,
      // backgroundColor: 'pink',
      justifyContent: 'space-evenly',
    },
    descriptionText: {
      fontSize: 20,
    },
    descriptionInput: {
      backgroundColor: 'white',
      width: '100%',
      height: '80%',
      borderRadius: 10,
      paddingLeft: 10,
      borderWidth: 0.3,
      borderColor: 'gray',
    },
    buttonContainer: {
      width: 320,
      height: 80,
      backgroundColor: 'orange',
      borderRadius: 30,
      color: 'white',
      flexDirection: 'row',
      gap: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 29,
    },
    cameraIcon: { position: 'absolute', top: -20, right: -12 },
    descriptionAndTitleContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    iconInfo: {
      width: 25,
      height: 25,
      borderRadius: 40,
      backgroundColor: '#e3e1e1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    touchableContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      height: '100%',
      alignItems: 'center',
    },
    imageTaked: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
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
    cancelIconContainer: {
      position: 'absolute',
      bottom: -height! * 0.04,
      right: width! * 0.41,
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: 'gray',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.6,
    },
    imageTakedExist: {
      flex: 1,
      backgroundColor: 'red',
      width: '100%',
      position: 'relative',
      borderRadius: 15,
    },
    cameraView: {
      position: 'relative',
      flex: 1,
    },
    takePhoto: {
      width: width! * 0.25,
      height: width! * 0.25,
      position: 'absolute',
      top: height! * 0.79,
      left: width! * 0.09,
    },
    cancelTakePhoto: {
      width: width! * 0.25,
      height: width! * 0.25,
      position: 'absolute',
      top: height! * 0.79,
      left: width! * 0.6,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    textZoom: {
      fontSize: 20,
      color: 'white',
    },
    slider: {
      flex: 1,
      marginLeft: 10,
    },
  });
