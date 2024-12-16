/* eslint-disable import/order */
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import { TabBarButton } from '@/components/TabBarButton';
import { usePathname } from 'expo-router';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width, height } = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ _height: 20, _width: 100 });

  const buttonWidth = dimensions._width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      _height: e.nativeEvent.layout.height,
      _width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);
  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateX: tabPositionX.value }],
  //   };
  // });

  const currentRoute = usePathname();

  return (
    <View onLayout={onTabbarLayout} style={styles(height, width).tabbar}>
      {/* <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: '#723feb',
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions._height - 15,
            width: buttonWidth - 25,
          },
        ]}
      /> */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = currentRoute === `/${route.name}`;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            name={route.name}
            label={label}
            isFocused={isFocused}
            tabBarAccessibilityLabel={options.tabBarAccessibilityLabel}
            testId={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            color={isFocused ? '#FFF' : '#f96f2aed'}
          />
        );
      })}
    </View>
  );
}

const styles = (height: number, width: number) =>
  StyleSheet.create({
    tabbar: {
      width: '100%',
      position: 'absolute',
      backgroundColor: 'white',
      height: height! * 0.09,
      bottom: height! * 0.01,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 5,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 10 },
      // shadowRadius: 10,
      // shadowOpacity: 0.1,
      // elevation: 10,
    },
  });
