/* eslint-disable import/order */
import {
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormLostMyPet, PictureTaked } from './components';
import * as ImagePicker from 'expo-image-picker';
import {
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';
import { SubmitButton } from '../FoundAPet/components';

const ILostMyPet = () => {
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <ScrollView style={styles().scroll}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'orange',
              height: '100%',
            }}
          >
            <View style={styles(width).imagesContainer}>
              <View style={styles(width).imagePickerContainer}>
                <PictureTaked image={image} handleOpenPicker={pickImage} />
              </View>
              <View style={styles(width).imagePickerContainer}>
                <PictureTaked image={image} handleOpenPicker={pickImage} />
              </View>
              <View style={styles(width).imagePickerContainer}>
                <PictureTaked image={image} handleOpenPicker={pickImage} />
              </View>
            </View>
            <FormLostMyPet />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ILostMyPet;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    imagePickerContainer: {
      width: width! * 0.25,
      height: width! * 0.25,
      borderWidth: 0.2,
      borderColor: 'gray',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
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
