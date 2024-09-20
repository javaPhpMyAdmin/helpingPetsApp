/* eslint-disable import/order */
import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';

interface FormTitleProps {
  title: string;
  handleInfo: () => void;
}

const FormTitle = ({ title, handleInfo }: FormTitleProps) => {
  return (
    <View style={styles.descriptionAndTitleContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.iconInfo}>
        <Pressable onPress={() => handleInfo}>
          <FontAwesome6 name="info" size={15} color="orange" />
        </Pressable>
      </View>
    </View>
  );
};

export default FormTitle;

const styles = StyleSheet.create({
  descriptionAndTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    bottom: 2,
  },
  titleText: {
    fontSize: 20,
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
