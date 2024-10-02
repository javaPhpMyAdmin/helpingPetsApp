/* eslint-disable import/order */
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
  return (
    <TouchableOpacity
      style={styles(loaded, width, height).buttonWrap}
      onPress={() =>
        type === 1
          ? router.push('/ReportPet/foundPet')
          : router.push('/ReportPet/lostMyPet')
      }
    >
      {/* <MaterialIcons name="pets" size={39} color="orange" /> */}

      <>
        {type === 1 ? (
          <FontAwesome name="paw" size={36} color="orange" />
        ) : (
          <Feather name="alert-triangle" size={39} color="orange" />
        )}
        <Text style={[styles().buttonText]}>{title}</Text>
      </>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = (loaded?: boolean, width?: number, height?: number) =>
  StyleSheet.create({
    buttonWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      left: width! * 0.03,
    },
    buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold', left: 10 },
  });
