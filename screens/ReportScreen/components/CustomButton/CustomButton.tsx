import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
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
    <Pressable
      style={styles(loaded, width, height).buttonWrap}
      onPress={() =>
        type === 1
          ? router.push('/ReportPet')
          : router.push('/ReportPet/lostMyPet')
      }
    >
      {/* <MaterialIcons name="pets" size={39} color="orange" /> */}
      {({ pressed }) => (
        <>
          {type === 1 ? (
            <FontAwesome name="paw" size={36} color="orange" />
          ) : (
            <Feather
              name="alert-triangle"
              size={39}
              color="orange"
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
          <Text style={[styles().buttonText, { opacity: pressed ? 0.5 : 1 }]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
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
    buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
  });
