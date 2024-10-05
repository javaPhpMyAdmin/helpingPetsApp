/* eslint-disable import/order */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { SwitchButton } from '../SwitchButton';

interface UserProfileProps {
  setIsVisibleModal: (isVisible: boolean) => void;
}

const UserProfile = ({ setIsVisibleModal }: UserProfileProps) => {
  const { width, height } = useWindowDimensions();
  const [selectedMode, setSelectedMode] = useState<string>('Si');

  const onSubmit = () => {
    console.log(selectedMode);
  };

  const handleOpenPicker = () => {
    console.log('picker');
  };

  return (
    <View style={styles(width, height).container}>
      <View style={styles(width, height).userImageContainer}>
        <Image
          source={require('@/assets/images/user.png')}
          style={styles(width, height).userImage}
        />
        <TouchableOpacity
          style={styles().editButton}
          onPress={handleOpenPicker}
        >
          <Text style={styles().fieldText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles(width, height).usernameContainer}>
        <Text style={styles().fieldText}>Usuario</Text>
        <TextInput
          style={styles(width, height).usernameInput}
          placeholder="Nombre"
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles(width, height).modeContainer}>
        <Text style={styles().fieldText}>Modo Oscuro</Text>
        <SwitchButton tab1="Si" tab2="No" setSelectedMode={setSelectedMode} />
      </View>
      <View style={styles(width, height).buttonsContainer}>
        <TouchableOpacity
          onPress={onSubmit}
          style={styles(width, height).button}
        >
          <Text style={styles().buttonText}>GUARDAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(width, height).button}
          onPress={() => setIsVisibleModal(false)}
        >
          <Text style={styles().buttonText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: '#faeaea',
      flex: 1,
      top: 170,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    userImageContainer: {
      width: width! * 0.4,
      height: width! * 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    userImage: {
      width: width! * 0.5,
      height: width! * 0.5,
      borderRadius: 100,
      borderColor: 'gray',
      borderWidth: 0.3,
      padding: 5,
      bottom: 50,
    },
    usernameContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 10,
      paddingHorizontal: 10,
    },
    usernameInput: {
      width: '100%',
      height: width! * 0.14,
      borderRadius: 10,
      backgroundColor: '#d6d6d6',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
    },
    buttonsContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 10,
      bottom: height! * 0.06,
    },
    button: {
      width: width! * 0.4,
      height: width! * 0.1,
      borderRadius: 100,
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'PlaypenSans',
    },
    modeContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 20,
      paddingHorizontal: 10,
      bottom: 40,
    },
    fieldText: {
      color: 'gray',
      fontSize: 22,
      fontWeight: 'bold',
      fontFamily: 'PlaypenSans',
    },
    editButton: {
      bottom: 40,
    },
  });
