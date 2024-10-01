/* eslint-disable import/order */
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { router, Link } from 'expo-router';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './schemaValidation';
import { SubmitButton } from '../SubmitButton';

interface FormProps {
  userEmail: string;
  password: string;
}

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const signIn = async () => {};

  const onSubmit = (data: FormProps) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log({ data });
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
                className="text-gray-600 font-bold tracking-wider text-5xl"
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
                      placeholder="Contraseña"
                      placeholderTextColor="gray"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
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
        <Animated.View
          entering={FadeInUp.delay(500).duration(1000).springify()}
          className="w-full border-gray-600"
        >
          <TouchableOpacity
            onPress={signIn}
            className="bg-transparent p-3 rounded-2xl border border-gray-300 mb-3"
          >
            <View style={styles().googleButton}>
              <Image
                source={require('@/assets/images/GLogo.jpg')}
                style={{ width: 40, height: 40 }}
              />
              <Text className="text-xl font-bold text-gray-500 text-center">
                Iniciar sesión con Google
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(700).duration(1000).springify()}
          className="flex-row justify-center"
        >
          <Text>No tienes una cuenta? </Text>
          <Link asChild href="/login/signupScreen">
            <Pressable>
              <Text className="text-sky-600">Crear una</Text>
            </Pressable>
          </Link>
        </Animated.View>
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
