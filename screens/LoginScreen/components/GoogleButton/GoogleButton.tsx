/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';

const GoogleButton = () => {
  //TODO: Sign in with Google FROM CONTEXT
  const signIn = async () => {};

  return (
    <Animated.View
      entering={FadeInUp.delay(500).duration(1000).springify()}
      className="w-full border-gray-600"
    >
      <TouchableOpacity
        onPress={signIn}
        className="bg-transparent p-3 rounded-2xl border border-gray-300 mb-3"
      >
        <View style={styles.googleButton}>
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
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
