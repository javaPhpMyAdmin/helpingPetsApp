/* eslint-disable import/order */
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './schemaValidation';
import { SubmitButton } from '../SubmitButton';
import { GoogleButton } from '../GoogleButton';
import { NewAccountWrapper } from '../NewAccountWrapper';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { Ionicons } from '@expo/vector-icons';

interface FormProps {
  userEmail: string;
  password: string;
}

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { onLogin } = useAuth();
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const handleSeePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (data: FormProps) => {
    setIsLoading(true);
    console.log('DATA FORM LOGIN', data);
    setTimeout(() => {
      onLogin!(data.userEmail!, data.password!);
      reset();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View className="h-full w-full justify-center pt-60">
      <TouchableWithoutFeedback
        style={styles().touchableContainer}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <>
            <View className="flex items-center bottom-2">
              <Animated.Text
                entering={FadeInUp.duration(1000).springify()}
                className="text-orange-400 font-bold tracking-wider text-5xl"
              >
                Login
              </Animated.Text>
            </View>

            <View className="flex items-center mx-4 space-y-4">
              <Animated.View
                entering={FadeInDown.delay(300).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full"
                style={styles(errors.userEmail).emailInput}
              >
                <Controller
                  name="userEmail"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="gray"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </Animated.View>
              {errors.userEmail && (
                <Text style={styles().errorText}>
                  {errors.userEmail.message}
                </Text>
              )}
              <Animated.View
                entering={FadeInUp.delay(300).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full"
                style={styles(errors.password).passwordInput}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      secureTextEntry={!isPasswordVisible}
                      placeholder="Contraseña"
                      placeholderTextColor="gray"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSeePassword}>
                  {isPasswordVisible ? (
                    <Ionicons name="eye-outline" size={34} color="black" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={34} color="gray" />
                  )}
                </TouchableOpacity>
              </Animated.View>
              {errors.password && (
                <Text style={styles().errorText}>
                  {errors.password.message}
                </Text>
              )}
            </View>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles(errors.userEmail, width).buttonsContainer}>
        <SubmitButton
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isValid={isValid}
        />
        <GoogleButton />
        <NewAccountWrapper />
      </View>
    </View>
  );
};

export default FormLogin;

const styles = (error?: FieldError, width?: number, height?: number) =>
  StyleSheet.create({
    errorText: {
      color: 'red',
      fontSize: 15,
      fontWeight: 'semibold',
      bottom: 10,
    },
    emailInput: {
      borderWidth: error ? 1.5 : 0,
      borderColor: error ? 'red' : 'gray',
    },
    passwordInput: {
      borderWidth: error ? 1.5 : 0,
      borderColor: error ? 'red' : 'gray',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    touchableContainer: {},
    buttonsContainer: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
      left: width! * 0.05,
    },
    googleButton: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });
