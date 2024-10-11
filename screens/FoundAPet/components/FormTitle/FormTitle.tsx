/* eslint-disable import/order */
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { alertDescription, alertTitle, infoTypes } from '../../helpers';

interface FormTitleProps {
  title: string;
  handleInfo: (type: number) => void;
  type: number;
}

const FormTitle = ({ title, handleInfo, type }: FormTitleProps) => {
  const fontScale = useWindowDimensions().fontScale;

  return (
    <View style={styles().descriptionAndTitleContainer}>
      <Text style={styles(fontScale).titleText}>{title}</Text>
      <TouchableWithoutFeedback
        onPress={() =>
          infoTypes.TITLE === type ? alertTitle() : alertDescription()
        }
      >
        <View style={styles(fontScale).iconInfo}>
          <FontAwesome6 name="info" size={15} color="orange" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FormTitle;

const styles = (fontScale?: number) =>
  StyleSheet.create({
    descriptionAndTitleContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
      bottom: 2,
    },
    titleText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
    },
    iconInfo: {
      width: 25,
      height: 25,
      borderRadius: 40,
      backgroundColor: '#e3e1e1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tooltipText: {
      fontSize: fontScale! < 1 ? 22 : fontScale! > 1 ? 17 : 20,
      fontWeight: 'bold',
      color: 'gray',
      fontStyle: 'italic',
    },
  });
