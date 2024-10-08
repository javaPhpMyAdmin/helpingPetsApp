/* eslint-disable import/order */
import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EditUserButtonProps {
  handleOpenModal: () => void;
}

const EditUserButton = ({ handleOpenModal }: EditUserButtonProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ left: width * 0.17 }}>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={styles(height, width).editUserButton}
      >
        <MaterialCommunityIcons
          name="circle-edit-outline"
          size={34}
          color="black"
        />
      </TouchableOpacity>
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
      right: width * 0.07,
    },
  });
