import { Link } from 'expo-router';
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
} from 'react-native-reanimated';
const SignUpScreen = () => {
  return (
    <View className="bg-white h-full w-full">
      <StatusBar barStyle="light-content" />
      <Image
        className="h-full w-full absolute"
        source={require('../assets/images/background.png')}
      />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className="h-[225] w-[90]"
          source={require('../assets/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(600).duration(1000).springify().damping(3)}
          className="h-[160] w-[65]"
          source={require('../assets/images/light.png')}
        />
      </View>
      <View className="h-full w-full flex justify-around pt-48 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Crear Cuenta
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
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholder="Comfirm password"
              placeholderTextColor="gray"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(700).duration(1000).springify()}
            className="w-full"
          >
            <Pressable className="bg-sky-400 p-3 rounded-2xl mb-3">
              <Text className="text-xl font-bold text-white text-center">
                Crear cuenta
              </Text>
            </Pressable>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(900).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Ya tienes una cuenta? </Text>
            <Link asChild href="/login">
              <Pressable>
                <Text className="text-sky-600">Login</Text>
              </Pressable>
            </Link>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
