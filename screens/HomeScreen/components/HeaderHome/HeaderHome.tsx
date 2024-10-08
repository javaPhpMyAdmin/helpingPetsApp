/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
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

  return (
    <View style={styles(width, height).userContainer}>
      <Image
        style={styles(height, width).userInfoAvatar}
        source={{ uri: authState?.user.photo! }}
      />
      <View style={styles(height, width).userInfoContainer}>
        <View style={styles(height, width).userInfo}>
          <Text style={styles(height, width, loaded).greetUser}>
            Hola {authState?.user.name}!
          </Text>
          <Text style={styles(height, width, loaded).userName}>
            @{authState?.user.email}
          </Text>
          <View style={styles(height, width).locationContainer}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={18}
              color="red"
            />
            <Text style={styles(height, width, loaded).location}>
              {currentPlaceName}
            </Text>
          </View>
        </View>
        <EditUserButton handleOpenModal={handleOpenModal} />
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = (width: number, height?: number, loaded?: boolean) =>
  StyleSheet.create({
    userContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: width * 0.025,
      height: width * 0.22,
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
      width: width * 0.09,
      height: width * 0.092,
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
      fontSize: 23.5,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    userName: {
      fontSize: 15,
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
      bottom: 2,
      right: width * 0.005,
      // backgroundColor: 'pink',
    },
    location: {
      left: 4,
      bottom: 1,
      fontFamily: loaded ? 'PlaypenSans' : '',
      color: 'gray',
    },
  });
