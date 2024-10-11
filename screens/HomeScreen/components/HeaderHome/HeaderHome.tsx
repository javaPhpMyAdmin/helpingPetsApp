/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EditUserButton } from '../EditUserButton';
import { useFonts } from 'expo-font';

import { useAuth } from '@/context';
import { useGetCurrentPlace } from '../../hooks';

interface HeaderHomeProps {
  handleOpenModal: () => void;
}

const HeaderHome = ({ handleOpenModal }: HeaderHomeProps) => {
  const { width, height } = useWindowDimensions();
  const { authState } = useAuth();
  const currentPlaceName = useGetCurrentPlace();

  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });

  const fontScale = useWindowDimensions().fontScale;

  return (
    <>
      <View style={styles(width, height, loaded, fontScale).userContainer}>
        <Image
          style={styles(height, width, loaded, fontScale).userInfoAvatar}
          source={{ uri: authState?.user.photo! }}
        />
        <View
          style={styles(height, width, loaded, fontScale).userInfoContainer}
        >
          <View style={styles(height, width, loaded, fontScale).userInfo}>
            <Text style={styles(height, width, loaded, fontScale).greetUser}>
              Hola {authState?.user.name}!
            </Text>
            <Text style={styles(height, width, loaded, fontScale).userName}>
              {authState?.user.email}
            </Text>

            <View
              style={styles(height, width, loaded, fontScale).locationContainer}
            >
              {currentPlaceName ? (
                <>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={fontScale! < 1 ? 22 : fontScale! > 1 ? 19 : 22}
                    color="red"
                  />
                  <Text
                    style={styles(height, width, loaded, fontScale).location}
                  >
                    {currentPlaceName}
                  </Text>
                </>
              ) : (
                <>
                  <ActivityIndicator style={{ bottom: 3 }} size="small" />
                  <Text
                    style={styles(height, width, loaded, fontScale).location}
                  >
                    Localizando...
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
      <EditUserButton handleOpenModal={handleOpenModal} />
    </>
  );
};

export default HeaderHome;

const styles = (
  width: number,
  height?: number,
  loaded?: boolean,
  fontScale?: number
) =>
  StyleSheet.create({
    userContainer: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: width * 0.025,
      height: width * 0.25,
      backgroundColor: 'white',
      borderRadius: 10,
      width: width * 0.95,
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 9,
      top: 2,
    },
    userInfoAvatar: {
      marginHorizontal: 6,
      right: 2,
      width: '20%', //width * 0.09,
      height: '88%', //width * 0.092,
      borderRadius: 10,
    },
    userInfoContainer: {
      marginHorizontal: 4,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    greetUser: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 18 : 22,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    userName: {
      fontSize: fontScale! < 1 ? 19 : fontScale! > 1 ? 13 : 16,
      fontFamily: loaded ? 'PlaypenSans' : '',
      bottom: width * 0.0044,
      color: 'gray',
    },
    userInfo: {
      flexDirection: 'column',
      gap: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    locationContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: 2,
      bottom: 1,
      right: width * 0.009,
      // backgroundColor: 'pink',
    },
    location: {
      fontSize: fontScale! < 1 ? 19 : fontScale! > 1 ? 13 : 16,
      left: 4,
      bottom: 1,
      fontFamily: loaded ? 'PlaypenSans' : '',
      color: 'gray',
    },
  });
