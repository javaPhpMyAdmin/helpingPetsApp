/* eslint-disable import/order */
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';

interface FormTitleProps {
  title: string;
  handleInfo: (type: number) => void;
  type: number;
}

const TitleLostMyPet = ({ title, handleInfo, type }: FormTitleProps) => {
  const fontScale = useWindowDimensions().fontScale;

  return (
    <View style={styles().descriptionAndTitleContainer}>
      <Text style={styles(fontScale).titleText}>{title}</Text>
      <TouchableWithoutFeedback onPress={() => handleInfo(type)}>
        <View style={styles(fontScale).iconInfo}>
          <FontAwesome6 name="info" size={15} color="orange" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TitleLostMyPet;

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
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 20,
      fontWeight: '700',
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
  });
