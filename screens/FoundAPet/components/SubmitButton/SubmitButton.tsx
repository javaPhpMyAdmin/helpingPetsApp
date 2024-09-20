/* eslint-disable import/order */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { UseFormHandleSubmit } from 'react-hook-form';

interface SubmitButtonProps {
  handleSubmit: UseFormHandleSubmit<FormProps, undefined>;
  submit: (data: FormProps) => void;
}

interface FormProps {
  reportTitle: string;
  reportDescription: string;
}

const SubmitButton = ({ handleSubmit, submit }: SubmitButtonProps) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', top: 5 }}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSubmit(submit)}
      >
        <Entypo name="check" size={60} color="white" />
        <Text style={styles.buttonText}>Reportar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 80,
    backgroundColor: 'orange',
    borderRadius: 30,
    color: 'white',
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 29,
  },
});
