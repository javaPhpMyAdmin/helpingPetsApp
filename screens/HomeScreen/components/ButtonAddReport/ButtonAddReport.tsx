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
      <AntDesign name="pluscircle" size={74} color="#f7923b" />
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
      right: 20,
      bottom: width! * 0.2,
      width: 100,
      height: 100,
      backgroundColor: 'transparent',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
