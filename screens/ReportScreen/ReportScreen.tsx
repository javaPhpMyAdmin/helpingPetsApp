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

export const ReportScreen = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });

  return (
    <View style={styles().container}>
      <View style={styles(loaded, width, height).greetingContainer}>
        <View style={{ left: width * 0.03, top: height * 0.03 }}>
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
      <View style={styles(loaded, width, height).cardContainer}>
        <View style={styles(loaded, width, height).cardInfo}>
          <Image
            style={{
              width: width * 0.33,
              height: width * 0.33,
              borderRadius: 70,
            }}
            source={require('@/assets/images/golden-pet.jpg')}
          />
          <View
            style={{
              width: width * 0.5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                bottom: 12,
                fontFamily: loaded ? 'PlaypenSans' : '',
              }}
            >
              Hey soy Pyxie
            </Text>
            <View style={{ width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Text
                  style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}
                >
                  Género
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 16,
                    opacity: 0.65,
                  }}
                >
                  Femenino
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Text
                  style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}
                >
                  Raza
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 16,
                    opacity: 0.65,
                  }}
                >
                  Golden
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}
              >
                <Text
                  style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}
                >
                  Edad
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 16,
                    opacity: 0.65,
                  }}
                >
                  9 meses
                </Text>
              </View>
            </View>
            <Text style={{ color: 'black', fontWeight: 'bold', flexShrink: 1 }}>
              Ayúdame a encontrar a otros amigos perdidos!
            </Text>
          </View>
        </View>
        <View style={styles(loaded, width, height).containerReport}>
          <View>
            <Text style={styles(loaded).reportTittle}>
              Reportar una mascota perdida
            </Text>
          </View>
          <View style={styles(loaded, width, height).buttonReportContainer}>
            <Pressable style={styles(loaded, width, height).buttonWrap}>
              {({ pressed }) => (
                <>
                  <MaterialIcons
                    name="pets"
                    color="orange"
                    size={39}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                  <Text
                    style={[
                      styles().buttonText,
                      { opacity: pressed ? 0.5 : 1 },
                    ]}
                  >
                    He encontrado una mascota perdida
                  </Text>
                </>
              )}
            </Pressable>
          </View>
          <View style={styles(loaded, width, height).buttonReportContainer}>
            <Pressable style={styles(loaded, width, height).buttonWrap}>
              {/* <MaterialIcons name="pets" size={39} color="orange" /> */}
              {({ pressed }) => (
                <>
                  <Feather
                    name="alert-triangle"
                    size={39}
                    color="orange"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                  <Text
                    style={[
                      styles().buttonText,
                      { opacity: pressed ? 0.5 : 1 },
                    ]}
                  >
                    He perdido a mi mascota
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

// export default ReportScreen;

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
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 30,
      shadowColor: 'blue',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 15,
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
      left: width! * 0.04,
      bottom: height! * 0.01,
    },
    buttonReportContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: height! * 0.065,
      width: width! * 0.9,
      backgroundColor: 'white',
      borderRadius: 12,
      borderColor: 'gray',
      borderWidth: 0.3,
      shadowColor: 'black',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2.5,
    },
    buttonWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      left: width! * 0.03,
    },
    buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
    reportTittle: {
      color: 'black',
      fontSize: 22,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    containerReport: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: 15,
      bottom: height! * 0.03,
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 2,
    },
    cardInfo: {
      width: width! * 0.9,
      height: height! * 0.27,
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: 'orange',
      borderWidth: 0.4,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginHorizontal: 1,
      shadowColor: '#424040',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 12,
    },
  });
