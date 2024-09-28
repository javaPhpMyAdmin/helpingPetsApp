/* eslint-disable import/order */
// import { Link, router } from 'expo-router';
// import React, { type ComponentProps } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StatusBar,
//   TextInput,
//   Pressable,
// } from 'react-native';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   isErrorWithCode,
//   isSuccessResponse,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import { LoginScreen } from '@/screens';

// WebBrowser.maybeCompleteAuthSession();

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// type href = ComponentProps<typeof Link>['href'];

// GoogleSignin.configure({
//   webClientId:
//     '964976949621-3faafs3idqdh8t1q1q0sb7leetvja0t5.apps.googleusercontent.com',
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//   iosClientId:
//     '964976949621-hr3aonf5ml6ic9shfgoi1j8bfda4o8jp.apps.googleusercontent.com',
//   // accountName: 'chelobat16411@gmail.com',
// });

// const LoginRoute = () => {
//   const [accessToken, setAccessToken] = React.useState<string | null>(null);
//   const [user, setUser] = React.useState<any | null>(null);
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     // expoClientId:
//     //   '964976949621-usahoh8gok9fuvphbrmh4qv3nltn325n.apps.googleusercontent.com',
//     iosClientId:
//       '964976949621-hr3aonf5ml6ic9shfgoi1j8bfda4o8jp.apps.googleusercontent.com',
//     webClientId:
//       '964976949621-usahoh8gok9fuvphbrmh4qv3nltn325n.apps.googleusercontent.com',
//     androidClientId:
//       '964976949621-7gt83kfvei6crm2co1q4gr4fp8079bg2.apps.googleusercontent.com',
//     scopes: ['profile', 'email'],
//   });

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();
//       if (isSuccessResponse(response)) {
//         setUser(response.data.user);
//         router.replace('/reportPet');
//       }
//     } catch (error) {
//       console.log('error', error);
//       if (isErrorWithCode(error)) {
//         switch (error.code) {
//           case statusCodes.IN_PROGRESS:
//             // operation (eg. sign in) already in progress
//             break;
//           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//             // Android only, play services not available or outdated
//             break;
//           default:
//           // some other error happened
//         }
//       }
//     }
//   };

//   const signOut = async () => {
//     try {
//       await GoogleSignin.signOut();
//       setUser(null); // Remember to remove the user from your app's state as well
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       console.log(response);
//       setAccessToken(response.params.access_token);
//       console.log('token', response.params.access_token);
//       accessToken && fetchUserInfo();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [response, accessToken]);

//   async function fetchUserInfo() {
//     const response = await fetch(
//       'https://www.googleapis.com/oauth2/v3/userinfo',
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     const userInfo = await response.json();

//     console.log('USER', user);
//     setUser(userInfo);
//   }

//   return (
//     // <LoginScreen />
//     <View className="bg-white h-full w-full">
//       <StatusBar barStyle="light-content" />
//       <Image
//         className="h-full w-full absolute"
//         source={require('@/assets/images/background.png')}
//       />
//       <View className="flex-row justify-around w-full absolute">
//         <Animated.Image
//           entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
//           className="h-[225] w-[90]"
//           source={require('@/assets/images/light.png')}
//         />
//         <Animated.Image
//           entering={FadeInUp.delay(600).duration(1000).springify().damping(3)}
//           className="h-[160] w-[65]"
//           source={require('@/assets/images/light.png')}
//         />
//       </View>
//       <View className="h-full w-full flex justify-around pt-40 pb-10">
//         <Text>USER {JSON.stringify(user)}</Text>
//         <View className="flex items-center">
//           <Animated.Text
//             entering={FadeInUp.duration(1000).springify()}
//             className="text-white font-bold tracking-wider text-5xl"
//           >
//             Login
//           </Animated.Text>
//         </View>
//         <View className="flex items-center mx-4 space-y-4">
//           <Animated.View
//             entering={FadeInDown.delay(300).duration(1000).springify()}
//             className="bg-black/5 p-5 rounded-2xl w-full"
//           >
//             <TextInput placeholder="Email" placeholderTextColor="gray" />
//           </Animated.View>
//           <Animated.View
//             entering={FadeInUp.delay(300).duration(1000).springify()}
//             className="bg-black/5 p-5 rounded-2xl w-full"
//           >
//             <TextInput placeholder="Password" placeholderTextColor="gray" />
//           </Animated.View>
//           <Animated.View
//             entering={FadeInUp.delay(500).duration(1000).springify()}
//             className="w-full"
//           >
//             <Pressable
//               onPress={() => router.push('/(tabs)')}
//               className="bg-sky-400 p-3 rounded-2xl mb-3"
//             >
//               <Text className="text-xl font-bold text-white text-center">
//                 Login
//               </Text>
//             </Pressable>
//           </Animated.View>
//           <Animated.View
//             entering={FadeInUp.delay(500).duration(1000).springify()}
//             className="w-full"
//           >
//             <Pressable
//               onPress={() => promptAsync()}
//               className="bg-sky-400 p-3 rounded-2xl mb-3"
//             >
//               <Text className="text-xl font-bold text-white text-center">
//                 Login with Google
//               </Text>
//             </Pressable>
//           </Animated.View>
//           <Animated.View
//             entering={FadeInUp.delay(500).duration(1000).springify()}
//             className="w-full"
//           >
//             <Pressable
//               onPress={signOut}
//               className="bg-sky-400 p-3 rounded-2xl mb-3"
//             >
//               <Text className="text-xl font-bold text-white text-center">
//                 Logout Google
//               </Text>
//             </Pressable>
//           </Animated.View>
//           <GoogleSigninButton
//             size={GoogleSigninButton.Size.Wide}
//             color={GoogleSigninButton.Color.Dark}
//             onPress={signIn}
//           />
//           <Animated.View
//             entering={FadeInUp.delay(700).duration(1000).springify()}
//             className="flex-row justify-center"
//           >
//             <Text>No tienes una cuenta? </Text>
//             <Link asChild href="/login/signupScreen">
//               <Pressable>
//                 <Text className="text-sky-600">Crear una</Text>
//               </Pressable>
//             </Link>
//           </Animated.View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default LoginRoute;

import React from 'react';
import { LoginScreen } from '../../screens';

const LoginRoute = () => {
  return <LoginScreen />;
};
export default LoginRoute;
