/* eslint-disable import/order */
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import Feather from '@expo/vector-icons/Feather';

const ReportScreen = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });

  return (
    <View style={styles().container}>
      <View style={styles(loaded, width, height).greetingContainer}>
        <View>
          <Text style={styles(loaded).meetYou}>Encantado de conocerte!</Text>
          <View>
            <Text style={styles(loaded).welcome}>Bienvenido</Text>
            <Text style={styles(loaded).welcome}>a</Text>
            <Text style={styles(loaded).welcome}>Helping pets</Text>
          </View>
        </View>
        <View>
          <Image
            style={styles(loaded, width, height).imageContainer}
            source={require('@/assets/images/paws.webp')}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          flex: 2,
        }}
      >
        <View
          style={{
            width: width * 0.8,
            height: height * 0.2,
            backgroundColor: 'skyblue',
            borderRadius: 20,
            borderColor: 'gray',
            borderWidth: 0.6,
            opacity: 0.2,
          }}
        />
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            gap: 15,
          }}
        >
          <View>
            <Text style={styles().reportTittle}>
              Reportar una mascota perdida
            </Text>
          </View>
          <View style={styles(loaded, width, height).buttonReportContainer}>
            <Pressable style={styles().buttonWrap}>
              <MaterialIcons name="pets" color="orange" size={39} />
              <Text style={styles().buttonText}>
                He encontrado una mascota perdida
              </Text>
            </Pressable>
          </View>
          <View style={styles(loaded, width, height).buttonReportContainer}>
            <Pressable style={styles().buttonWrap}>
              {/* <MaterialIcons name="pets" size={39} color="orange" /> */}
              <Feather name="alert-triangle" size={39} color="orange" />
              <Text style={styles().buttonText}>He perdido a mi mascota</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReportScreen;

const styles = (loaded?: boolean, width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    greetingContainer: {
      backgroundColor: 'orange',
      width: '100%',
      height: height! * 0.4,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: 15,
    },
    welcome: {
      fontSize: 30,
      color: 'white',
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    meetYou: {
      color: 'white',
      fontSize: 14,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    imageContainer: {
      width: width! * 0.56,
      height: height! * 0.25,
    },
    buttonReportContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: height! * 0.065,
      width: width! * 0.8,
      backgroundColor: 'transparent',
      borderRadius: 15,
      borderColor: 'gray',
      borderWidth: 0.3,
    },
    buttonWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      left: 5,
    },
    buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
    reportTittle: { color: 'black', fontSize: 22, fontWeight: '800' },
  });
