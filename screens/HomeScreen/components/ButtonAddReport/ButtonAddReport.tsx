/* eslint-disable import/order */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ButtonAddReportProps {
  handleOpenAddModal: () => void;
}

const ButtonAddReport = ({ handleOpenAddModal }: ButtonAddReportProps) => {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={handleOpenAddModal}
      style={styles({ width }).buttonContainer}
    >
      {/* <Text style={{ color: 'white' }}>NUEVO</Text> */}
      <AntDesign name="plus" size={74} color="#f86e05" />
    </TouchableOpacity>
  );
};

export default ButtonAddReport;

interface StylesProps {
  isKeyboardVisible?: boolean;
  fontScale?: number;
  width?: number;
  height?: number;
}

const styles = ({ width }: StylesProps) =>
  StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      right: 14,
      bottom: width! * 0.02,
      width: width! * 0.2,
      height: width! * 0.2,
      backgroundColor: 'orange',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
