import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  useWindowDimensions,
  DimensionValue,
  GestureResponderEvent,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { RenderItem } from './components';

import { MockedPets } from '@/MockedPets';

const categories = [
  {
    id: '3434333333',
    category: 'Todos',
  },
  {
    id: '344234',
    category: 'Perros',
  },
  {
    id: '4234',
    category: 'Gatos',
  },
  {
    id: '423334',
    category: 'Conejos',
  },
  {
    id: '423994',
    category: 'Aves',
  },
  {
    id: '423400',
    category: 'Hamsters',
  },
];

export const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const handleOnPress = (category: string) => {
    setSelectedCategory(category);
  };
  const ndate = new Date();
  return (
    <SafeAreaView style={styles(height).container}>
      {/* <Text style={styles().title}>Ultimos registros</Text> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginHorizontal: 16,
          height: 80,
          backgroundColor: 'white',
          borderRadius: 10,
          width: 360,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 1,
          shadowRadius: 16,
          elevation: 9,
          top: 2,
        }}
      >
        <Image
          style={{
            marginHorizontal: 7,
            width: 65,
            height: 65,
            borderRadius: 10,
          }}
          source={require('@/assets/images/random_user.webp')}
        />
        <View
          style={{
            marginHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', fontStyle: 'italic' }}
            >
              Hola, Usuario
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '400' }}>
              @usuarioLogueado
            </Text>
            <Text>{ndate.toLocaleString()}</Text>
          </View>
          <View style={{ left: 70 }}>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderColor: 'lightgray',
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="circle-edit-outline"
                size={30}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={MockedPets}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        ListHeaderComponentStyle={{ marginVertical: 10 }}
        ListHeaderComponent={() => (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 12,
                position: 'static',
              }}
              keyExtractor={(item) => item.id}
              data={categories}
              horizontal
              style={{ paddingVertical: 5, position: 'static' }}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    width: 115,
                    height: 30,
                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    borderRadius: 10,
                    opacity: 0.89,
                  }}
                  onPress={() => handleOnPress(item.category)}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        styles().categoryItem,
                        selectedCategory === item.category
                          ? styles().selectedCategory
                          : null,
                      ]}
                    >
                      {item.category}
                    </Text>
                  )}
                </Pressable>
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = (height?: number) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fafafb',
      height: height! * 0.931,
    },
    title: {
      fontSize: 34,
      marginHorizontal: 20,
      color: '#323232',
      fontWeight: 'bold',
    },
    categoryItem: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: 12,
      color: 'black',
      opacity: 0.3,
    },
    selectedCategory: {
      color: 'orange',
      fontSize: 22,
      fontWeight: '900',
      opacity: 1,
    },
  });
