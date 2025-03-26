/* eslint-disable import/order */
import { useState } from 'react';
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AuthState, UserContext } from '../types';
import { AuthContext } from '../AuthContext/AuthContext';
import { set } from 'react-hook-form';
import { Href, router } from 'expo-router';

// GoogleSignin.configure({
//   webClientId:
//     '964976949621-3faafs3idqdh8t1q1q0sb7leetvja0t5.apps.googleusercontent.com',
//   offlineAccess: true,
//   iosClientId:
//     '964976949621-hr3aonf5ml6ic9shfgoi1j8bfda4o8jp.apps.googleusercontent.com',
// });

export const UserEmpty = {
  email: '',
  photo: '',
  name: '',
};

export const Constants = {
  EMPTY: '',
  GO_HOME: '/',
  BEARER: 'Bearer ',
};

const UserMocked = {
  email: 'chelobat16411@gmail.com',
  photo:
    'https://lh3.googleusercontent.com/a/ACg8ocIxeLSjaXNYDkWZtk8G5aPK-_MWaOiTmp90RouXm7OTUgjy1Z69=s288-c-no',
  name: 'powerRanger',
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [authState, setAuthState] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserContext>(UserMocked);
  const [accessToken, setAccessToken] = useState<string>(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOlsiSEVMUElOR19QRVRTIl0sImp0aSI6Ijg0OTdjNmIzLTIwZjctNGI5Mi1iYjc1LTgwY2QzNjBiY2RkZiIsImlhdCI6MTc0Mjk0ODQxNiwibmJmIjoxNzQyOTQ4NDE2LCJzdWIiOiJjaGVsb2JhdDE2NDExQGdtYWlsLmNvbSIsIkFVVEhPUklUSUVTIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sIlJPTEUiOiJVU0VSIiwiZXhwIjoxNzQyOTU0NDE2fQ.VIRi9GDQkxkbaikXS9vorzGrKBwPsBmNypLVg0XRdUjT5ECNubVG0FgzXud5YWEBI9HeZSwL7TVVLc7RcnK4pw'
  );

  const login = async (username: string, password: string) => {
    console.log('LOGIN', username, password);
    const response = await fetch('http://localhost:8082/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
    });
    const data = await response.json();
    console.log('Login response', JSON.stringify(data, null, 4));
    setAuthState(true);
    setAccessToken(data.result.result.accessToken);
    setCurrentUser({
      email: data.result.result.email,
      photo: data.result.result.profileImageUrl,
      name: data.result.result.firstName,
    });
    router.replace(`${Constants.GO_HOME}` as Href);
  };

  const loginWithGoogle = async () => {
    // setAuthState({ authenticated: true, user: UserEmpty });
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const response = await GoogleSignin.signIn();
    //   if (isSuccessResponse(response)) {
    //     const userAdapted = {
    //       email: response.data.user.email!,
    //       photo: response.data.user.photo!,
    //       name: response.data.user.givenName!,
    //     };
    //     setAuthState({ authenticated: true, user: userAdapted });
    //     console.log('RESPONSE DATA', response.data.user);
    //     console.log('TOKEN', response.data.idToken);
    //     // router.replace('/reportPet');
    //   }
    // } catch (error) {
    //   console.log('error', error);
    //   if (isErrorWithCode(error)) {
    //     switch (error.code) {
    //       case statusCodes.IN_PROGRESS:
    //         // operation (eg. sign in) already in progress
    //         break;
    //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //         // Android only, play services not available or outdated
    //         break;
    //       default:
    //       // some other error happened
    //     }
    //   }
    // }
  };
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `${Constants.BEARER}${accessToken}`,
        },
      });
      const data = await response.json();
      console.log('Logout response', JSON.stringify(data, null, 4));
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      setAuthState(false);
      setCurrentUser(UserEmpty);
      setAccessToken(`${Constants.EMPTY}`);
      router.replace(`${Constants.GO_HOME}` as Href);
    } catch (error) {
      console.log('ERROR', error);
    }
    // try {
    //   await GoogleSignin.signOut();
    //   setAuthState({ authenticated: false, user: UserEmpty }); // Remember to remove the user from your app's state as well
    // } catch (error) {
    //   console.log('ERROR', error);
    //   Alert.alert('Ocurrió un error inesperado, vuelve a intentar');
    // }
  };

  const signIn = async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    setAuthState(true);
  };

  const signUpWithGoogle = async () => {};

  const value = {
    onLogin: login,
    onLogout: logout,
    onSignIn: signIn,
    authState,
    currentUser,
    setAuthState,
    setAccessToken,
    accessToken,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
