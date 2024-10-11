/* eslint-disable import/order */
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';

interface CustomButtonProps {
  loaded: boolean;
  width: number;
  height: number;
  title: string;
  type: number;
}

const CustomButton = ({
  loaded,
  width,
  height,
  title,
  type,
}: CustomButtonProps) => {
  const fontScale = useWindowDimensions().fontScale;

  return (
    <TouchableOpacity
      style={styles(fontScale, loaded, width, height).buttonWrap}
      onPress={() =>
        type === 1
          ? router.push('/ReportPet/foundPet')
          : type === 2
            ? router.push('/ReportPet/lostMyPet')
            : router.push('/(auth)/(tabs)/home')
      }
    >
      {/* <MaterialIcons name="pets" size={39} color="orange" /> */}

      <>
        {type === 1 ? (
          <FontAwesome name="paw" size={36} color="orange" />
        ) : type === 2 ? (
          <Feather name="alert-triangle" size={39} color="orange" />
        ) : (
          <Octicons name="report" size={34} color="orange" />
        )}
        <Text style={[styles(fontScale).buttonText]}>{title}</Text>
      </>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = (
  fontScale?: number,
  loaded?: boolean,
  width?: number,
  height?: number
) =>
  StyleSheet.create({
    buttonWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      left: width! * 0.03,
    },
    buttonText: {
      color: 'black',
      fontSize: fontScale! < 1 ? 21 : fontScale! > 1 ? 14 : 18,
      fontWeight: 'bold',
      left: 10,
    },
  });
