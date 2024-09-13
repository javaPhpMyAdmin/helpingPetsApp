import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { MockedPets } from '@/MockedPets';

const { width, height } = Dimensions.get('screen');

export default function AddNew() {
  return (
    <>
      <StatusBar animated backgroundColor="white" hidden={false} />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={[styles.containerTitle]}>
          <View>
            <Text style={[styles.headerTitle]}>Últimos Registros</Text>
          </View>
          <View>
            <FontAwesome5 name="users" size={24} color="black" />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: height * 0.74,
            alignItems: 'center',
            padding: 5.5,
          }}
        >
          <FlatList
            style={{ width: '98%' }}
            showsVerticalScrollIndicator={false}
            data={MockedPets}
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback
                onPress={
                  () =>
                    router.push({
                      pathname: `/testIdtest`,
                      params: {
                        petId: item.id,
                        image: item.image,
                        title: item.title,
                        userEmail: item.userEmail,
                      },
                    })
                  // router.push({
                  //   pathname: `/home/[petId]`,
                  //   params: {
                  //     petId: item.id,
                  //     image: item.image,
                  //     title: item.title,
                  //     userEmail: item.userEmail,
                  //   },
                  // })
                }
              >
                <View style={styles.itemContainer}>
                  <Animated.Image
                    sharedTransitionTag={item.image}
                    style={{
                      width: width * 0.942,
                      height: width * 0.466,
                      borderRadius: 16,
                      bottom: 0,
                      left: 0,
                      top: 0,
                    }}
                    source={{
                      uri: item.image,
                    }}
                    resizeMode="cover"
                  />
                  <View style={styles.itemDetailsContainer}>
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        width: '85%',
                        height: '85%',
                      }}
                    >
                      <Text numberOfLines={2} style={styles.itemTitle}>
                        {item.title.length > 20
                          ? `${item.title.substring(0, 70)}...`
                          : item.title}
                      </Text>
                      <Text style={styles.itemUser}>{item.createdAt}</Text>
                      <Text style={styles.itemUser}>{item.userEmail}</Text>
                    </View>
                    <Pressable onPress={() => null}>
                      <View style={styles.mapIconContainer}>
                        <FontAwesome5
                          name="map-marker-alt"
                          size={37}
                          color="red"
                        />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    top: 3,
    // left: 6,
    width: width * 0.95,
    height: width * 0.7,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10, // MARGIN_VERTICAL,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#rgb(255, 255, 255)',
    shadowColor: Platform.OS === 'ios' ? 'gray' : 'black',
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    shadowOpacity: 1,
  },
  itemDetailsContainer: {
    top: 10,
    paddingHorizontal: 0,
    width: '98%',
    height: '20%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 35,
    borderRadius: 20,
    backgroundColor: '#rgb(255, 255, 255)',
  },
  itemUser: {
    left: 10,
    top: 0,
    bottom: 5,
    fontWeight: 'bold',
    fontSize: width < 380 ? 14 : 16,
    color: 'black',
    opacity: 0.6,
  },
  mapIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    width: '100%',
    height: '90%',
    backgroundColor: 'transparent',
  },
  itemTitle: {
    left: 10,
    // width: '95%',
    fontSize: width < 380 ? 14 : 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1.2,
  },
  headerTitleDate: {
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.5,
    padding: 1,
  },
  containerTitle: {
    display: 'flex',
    width: '95%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#rgb(255, 255, 255)',
  },
  safeAreaContainer: {
    flex: 1,
    top: Platform.OS === 'ios' ? 0 : 35,
    backgroundColor: '#rgb(255, 255, 255)',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
