/* eslint-disable import/order */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SwitchButton } from '../SwitchButton';
import { useAuth } from '@/context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useKeyboardVisible } from '@/hooks/useIsKeyboardVisible';
import * as ImagePicker from 'expo-image-picker';

interface UserProfileProps {
  setIsVisibleModal: (isVisible: boolean) => void;
}

const UserProfile = ({ setIsVisibleModal }: UserProfileProps) => {
  const { width, height } = useWindowDimensions();
  const [selectedMode, setSelectedMode] = useState<string>('No');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Español');
  const { authState } = useAuth();
  const [userName, setUserName] = useState(authState?.user.name);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [image, setImage] = useState<string>(authState?.user.photo!);
  const isKeyboardVisible = useKeyboardVisible();
  const fontScale = useWindowDimensions().fontScale;

  const onSubmit = () => {
    Alert.alert(
      JSON.stringify({ selectedLanguage, selectedMode, userName, image })
    );
  };

  const pickImage = async () => {
    setIsLoadingImage(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      alert(`OCURRIÓ UN ERROR INESPERADO, REINTENTE POR FAVOR, ${error}`);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <View style={styles({ isKeyboardVisible, width, height }).container}>
      <LinearGradient
        colors={['#ba5370', '#f4e2d8']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => Alert.alert('NOS VEMOS DULIO')}
        style={{
          position: 'absolute',
          right: 10,
          top: 20,
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="logout" size={44} color="black" />
        <Text
          style={{
            color: 'white',
            fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 13 : 14,
          }}
        >
          Cerrar sesión
        </Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 30,
        }}
      >
        <View
        // style={
        //   styles({ isKeyboardVisible, width, height }).userImageContainer
        // }
        >
          {isLoadingImage ? (
            <ActivityIndicator size="large" color="pink" />
          ) : (
            <>
              <Image
                source={{ uri: image }}
                style={styles({ isKeyboardVisible, width, height }).userImage}
              />
              <TouchableOpacity
                style={styles({ isKeyboardVisible, width }).editButton}
                onPress={pickImage}
              >
                <Text style={styles({ fontScale }).fieldText}>Editar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles({ width, height }).usernameContainer}>
          <Text style={styles({ fontScale }).fieldText}>Usuario</Text>
          <TextInput
            onChange={(e) => setUserName(e.nativeEvent.text)}
            value={userName}
            style={styles({ width, height }).usernameInput}
            placeholder="Nombre"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles({ width, height }).modeContainer}>
          <Text style={styles({ fontScale }).fieldText}>Modo Oscuro</Text>
          <SwitchButton
            type={1}
            tab1="No"
            tab2="Si"
            setSelectedMode={setSelectedMode}
          />
        </View>
        <View style={styles({ width, height }).languageContainer}>
          <Text style={styles({ fontScale }).fieldText}>Lenguaje</Text>
          <SwitchButton
            tab1="Español"
            tab2="Inglés"
            setSelectedLanguage={setSelectedLanguage}
          />
        </View>
        <View style={styles({ width, height }).buttonsContainer}>
          <TouchableOpacity
            onPress={onSubmit}
            style={styles({ width, height }).button}
          >
            <Text style={styles({ fontScale }).buttonText}>GUARDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles({ width, height }).button}
            onPress={() => setIsVisibleModal(false)}
          >
            <Text style={styles({ fontScale }).buttonText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserProfile;

interface StylesProps {
  isKeyboardVisible?: boolean;
  fontScale?: number;
  width?: number;
  height?: number;
}

const styles = ({ isKeyboardVisible, fontScale, width, height }: StylesProps) =>
  StyleSheet.create({
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      top: !isKeyboardVisible ? height! * 0.15 : height! * 0.02,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    userImage: {
      width: width! * 0.5,
      height: width! * 0.5,
      borderRadius: 100,
      borderColor: 'white',
      borderWidth: 0.5,
      padding: 5,
      bottom: height! * 0.02,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 9,
      // opacity: isKeyboardVisible ? 0 : 1,
    },
    usernameContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 10,
      paddingHorizontal: 10,
      bottom: 25,
    },
    usernameInput: {
      width: '100%',
      height: width! * 0.14,
      borderRadius: 10,
      backgroundColor: '#f7f5f5',
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
      bottom: height! * 0.04,
    },
    button: {
      width: width! * 0.4,
      height: width! * 0.1,
      borderRadius: 100,
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 9,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'PlaypenSans',
    },
    modeContainer: {
      width: '100%',
      height: width! * 0.36,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 20,
      paddingHorizontal: 10,
      bottom: 25,
    },
    languageContainer: {
      width: '100%',
      height: width! * 0.36,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 20,
      paddingHorizontal: 10,
      bottom: 55,
    },
    fieldText: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      fontFamily: 'PlaypenSans',
    },
    editButton: {
      bottom: 60,
      left: width! * 0.17,
    },
  });
