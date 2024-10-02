/* eslint-disable import/order */
import { useState } from 'react';
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AuthState } from '../types';
import { AuthContext } from '../AuthContext/AuthContext';

// GoogleSignin.configure({
//   webClientId:
//     '964976949621-3faafs3idqdh8t1q1q0sb7leetvja0t5.apps.googleusercontent.com',
//   offlineAccess: true,
//   iosClientId:
//     '964976949621-hr3aonf5ml6ic9shfgoi1j8bfda4o8jp.apps.googleusercontent.com',
// });

const UserEmpty = {
  email: '',
  photo: '',
  name: '',
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    user: UserEmpty,
  });

  const login = async (username: string, password: string) => {
    setAuthState({ authenticated: true, user: UserEmpty });
  };

  const loginWithGoogle = async () => {
    setAuthState({ authenticated: true, user: UserEmpty });
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
    setAuthState({ authenticated: true, user: UserEmpty });
  };

  const signUpWithGoogle = async () => {};

  const value = {
    onLogin: login,
    onLogout: logout,
    onSignIn: signIn,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
