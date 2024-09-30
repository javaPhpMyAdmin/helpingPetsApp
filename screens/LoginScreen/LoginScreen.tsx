/* eslint-disable import/order */
import { Link, router } from 'expo-router';
import React, { type ComponentProps } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type href = ComponentProps<typeof Link>['href'];

GoogleSignin.configure({
  webClientId:
    '964976949621-3faafs3idqdh8t1q1q0sb7leetvja0t5.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  iosClientId:
    '964976949621-hr3aonf5ml6ic9shfgoi1j8bfda4o8jp.apps.googleusercontent.com',
  // accountName: 'chelobat16411@gmail.com',
});

const LoginScreen = () => {
  const [user, setUser] = React.useState<any | null>(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUser(response.data.user);
        console.log('RESPONSE DATA', response.data.user);
        console.log('TOKEN', response.data.idToken);
        // router.replace('/reportPet');
      }
    } catch (error) {
      console.log('error', error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar barStyle="light-content" />
      <Image
        className="h-full w-full absolute"
        source={require('@/assets/images/background.png')}
      />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className="h-[225] w-[90]"
          source={require('@/assets/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(600).duration(1000).springify().damping(3)}
          className="h-[160] w-[65]"
          source={require('@/assets/images/light.png')}
        />
      </View>
      <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Login
          </Animated.Text>
        </View>
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.delay(300).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput placeholder="Email" placeholderTextColor="gray" />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(300).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput placeholder="Password" placeholderTextColor="gray" />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(500).duration(1000).springify()}
            className="w-full"
          >
            <Pressable
              onPress={() => router.push('/(tabs)')}
              className="bg-orange-500 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Login
              </Text>
            </Pressable>
          </Animated.View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                marginHorizontal: 10,
                color: 'gray',
                opacity: 0.4,
                bottom: 5,
              }}
            >
              ________________________
            </Text>
            <Text style={{ opacity: 0.4 }}>Ó</Text>
            <Text
              style={{
                marginHorizontal: 10,
                color: 'gray',
                opacity: 0.4,
                bottom: 5,
              }}
            >
              ________________________
            </Text>
          </View>
          <Animated.View
            entering={FadeInUp.delay(500).duration(1000).springify()}
            className="w-full border-gray-600"
          >
            <TouchableOpacity
              onPress={signIn}
              className="bg-transparent p-3 rounded-2xl border border-gray-300 mb-3"
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
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
    </View>
  );
};

export default LoginScreen;
