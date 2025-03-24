/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useAuth } from '../context';

// const UserMocked = {
//   email: 'chelobat16411@gmail.com',
//   photo:
//     'https://lh3.googleusercontent.com/a/ACg8ocIxeLSjaXNYDkWZtk8G5aPK-_MWaOiTmp90RouXm7OTUgjy1Z69=s288-c-no',
//   name: 'powerRanger',
// };

export default function AuthCallback() {
  const { setAuthState, setAccessToken, setCurrentUser } = useAuth();
  const router = useRouter();
  const query = useGlobalSearchParams(); // Captura el token de la URL

  const getUserInfo = async () => {
    fetch('http://localhost:8082/api/v1/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${query.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const loggedUser = {
          email: data.result.user.email,
          photo: data.result.user.profileImageUrl,
          name: data.result.user.firstName,
        };
        setCurrentUser!(loggedUser);
        // console.log('AUTH STATE UPDATED', authState);
        // console.log('LOGGED USER', loggedUser);
        // console.log('DATA', data);
      });
  };
  useEffect(() => {
    if (query && query.accessToken) {
      setAccessToken!(query.accessToken as string);
      getUserInfo();
      setAuthState!(true);
      router.replace('/');
    }
  }, [query, router]);

  return (
    <SafeAreaView>
      <View>
        <Text>Redirecting...</Text>
      </View>
    </SafeAreaView>
  );
}
