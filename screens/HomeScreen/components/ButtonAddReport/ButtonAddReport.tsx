/* eslint-disable import/order */
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ButtonAddReportProps {
  handleOpenAddModal: () => void;
}

const ButtonAddReport = ({ handleOpenAddModal }: ButtonAddReportProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={handleOpenAddModal}
      style={styles({ height, width }).buttonContainer}
    >
      {/* <Text style={{ color: 'white' }}>NUEVO</Text> */}
      <AntDesign name="plus" size={74} color="#f86e05" />
    </TouchableOpacity>
  );
};

export default ButtonAddReport;

interface StylesProps {
  width?: number;
  height?: number;
}

const styles = ({ width, height }: StylesProps) =>
  StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      right: 16,
      bottom: height! * 0.07,
      width: width! * 0.2,
      height: width! * 0.2,
      backgroundColor: 'orange',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
