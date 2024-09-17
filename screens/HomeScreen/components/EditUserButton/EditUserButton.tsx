/* eslint-disable import/order */
import { View, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditUserButton = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ left: width * 0.2 }}>
      <Pressable style={styles(height, width).editUserButton}>
        <MaterialCommunityIcons
          name="circle-edit-outline"
          size={34}
          color="black"
        />
      </Pressable>
    </View>
  );
};

export default EditUserButton;

const styles = (width: number, height?: number) =>
  StyleSheet.create({
    editUserButton: {
      width: 40,
      height: 40,
      borderColor: 'lightgray',
      borderWidth: 0.8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      right: width * 0.04,
    },
  });
