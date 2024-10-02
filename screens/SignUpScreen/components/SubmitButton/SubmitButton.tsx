/* eslint-disable import/order */
import {
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { UseFormHandleSubmit } from 'react-hook-form';

interface FormProps {
  userEmail: string;
  password: string;
  confirmPassword: string;
}

interface SubmitButtonProps {
  handleSubmit: UseFormHandleSubmit<FormProps, undefined>;
  onSubmit: (data: FormProps) => void;
  isLoading: boolean;
  isValid: boolean;
}

const SubmitButton = ({
  handleSubmit,
  onSubmit,
  isLoading,
  isValid,
}: SubmitButtonProps) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(700).duration(1000).springify()}
      className="w-full"
    >
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        className="bg-orange-400 p-3 rounded-2xl mb-3"
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <Text className="text-xl font-bold text-white text-center">
            Crear cuenta
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SubmitButton;
