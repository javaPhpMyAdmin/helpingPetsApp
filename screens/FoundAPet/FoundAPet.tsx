/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';

const FoundAPet = () => {
  return (
    <View style={styles().container}>
      <View>
        <Image
          source={require('@/assets/images/default_camera.jpg')}
          style={styles().imagePicker}
        />
      </View>
      <View style={styles().titleContainer}>
        <Text>Titulo</Text>
        <TextInput
          style={styles().titleInput}
          placeholder="Ingrese un titulo"
        />
      </View>
      <View style={styles().descriptionContainer}>
        <Text>Descripcion</Text>
        <TextInput
          style={styles().descriptionInput}
          multiline
          placeholder="Ingrese una descripcion"
        />
      </View>
      <View>
        <Pressable style={styles().buttonContainer}>
          <Text style={styles().buttonText}>Reportar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FoundAPet;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    imagePicker: {
      width: 70,
      height: 70,
    },
    titleContainer: {
      width: 370,
      height: 90,
      backgroundColor: 'orange',
      justifyContent: 'space-evenly',
    },
    titleText: {},
    titleInput: {
      backgroundColor: 'blue',
      width: '100%',
      height: '60%',
      borderRadius: 10,
    },
    descriptionContainer: {
      width: 370,
      height: 200,
      backgroundColor: 'pink',
      justifyContent: 'space-evenly',
    },
    descriptionText: {},
    descriptionInput: {
      backgroundColor: 'red',
      width: '100%',
      height: '80%',
      borderRadius: 10,
    },
    buttonContainer: {
      width: 200,
      height: 40,
      backgroundColor: 'skyblue',
      borderRadius: 20,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 19,
    },
  });
