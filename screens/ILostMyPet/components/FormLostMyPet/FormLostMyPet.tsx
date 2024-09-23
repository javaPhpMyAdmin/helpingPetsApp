/* eslint-disable import/order */
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const FormLostMyPet = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles(width).formContainer}>
      <View style={styles(width, height).titleContainer}>
        <Text>Nombre</Text>
        <TextInput style={styles().titleInput} placeholder="Nombre" />
      </View>
      <View style={styles(width, height).titleContainer}>
        <Text>Sexo</Text>
        <TextInput style={styles().titleInput} placeholder="Sexo" />
      </View>
      <View style={styles(width, height).titleContainer}>
        <Text>Raza</Text>
        <TextInput style={styles().titleInput} placeholder="Raza" />
      </View>
      <View style={styles(width, height).titleContainer}>
        <Text>Recompensa</Text>
        <TextInput style={styles().titleInput} placeholder="Raza" />
      </View>
      <View style={styles(width, height).aboutPetContainer}>
        <Text>Acerca del animal</Text>
        <TextInput multiline style={styles().aboutPet} placeholder="Raza" />
      </View>
      {/* <SubmitButton /> */}
    </View>
  );
};

export default FormLostMyPet;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      //   backgroundColor: 'red',
    },
    titleContainer: {
      width: width! * 0.939,
      height: height! * 0.15,
      // backgroundColor: 'orange',
      justifyContent: 'space-evenly',
    },
    titleInput: {
      backgroundColor: 'white',
      width: '100%',
      height: '45%',
      borderRadius: 10,
      borderWidth: 0.3,
      borderColor: 'gray',
      paddingLeft: 10,
    },
    aboutPetContainer: {
      width: width! * 0.939,
      height: height! * 0.27,
      justifyContent: 'space-evenly',
      gap: 5,
      top: 10,
    },
    aboutPet: {
      backgroundColor: 'white',
      width: '100%',
      height: '80%',
      borderRadius: 10,
      paddingLeft: 10,
      paddingTop: 10,
      borderWidth: 0.3,
      borderColor: 'gray',
    },
  });
