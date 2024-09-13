import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HeaderDetail() {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { top: Platform.OS === 'ios' ? inset.top : 50 },
      ]}
    >
      <Pressable onPress={() => router.back()}>
        <Image
          style={styles.chevron}
          source={require('@/assets/images/chevron.png')}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 20,
    right: 20,
  },
  chevron: {
    height: 44,
    width: 44,
  },
});
