/* eslint-disable import/order */
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { Entypo } from '@expo/vector-icons';

interface SubmitButtonProps {
  handleSubmit: UseFormHandleSubmit<FormProps, undefined>;
  submit: (data: FormProps) => void;
}

interface FormProps {
  reportTitle: string;
  reportDescription: string;
}

const SubmitButton = ({ handleSubmit, submit }: SubmitButtonProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <>
      <TouchableOpacity
        style={styles(width, height).buttonContainer}
        onPress={handleSubmit(submit)}
      >
        <>
          <Entypo name="check" size={60} color="white" />
          <Text style={styles().buttonText}>Reportar</Text>
        </>
      </TouchableOpacity>
    </>
  );
};

export default SubmitButton;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    buttonContainer: {
      width: width! * 0.8,
      height: width! * 0.2,
      backgroundColor: 'orange',
      borderRadius: 30,
      flexDirection: 'row',
      gap: 1,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: height! * 0.1,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 29,
    },
  });
