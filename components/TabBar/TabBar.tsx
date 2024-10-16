/* eslint-disable import/order */
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { TabBarButton } from '@/components/TabBarButton';
import { router, usePathname } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

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
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });
  let indexAux = 0;
  let isFocused = false;
  let routeAux: TabNavigationState<ParamListBase>;

  const currentRoute = usePathname();
  //TODO: DELETE AFTER TESTING
  console.log({ currentRoute });

  // useEffect(() => {
  //   tabPositionX.value = withSpring(buttonWidth * indexAux, {
  //     duration: 1500,
  //   });
  //   const event = navigation.emit({
  //     type: 'tabPress',
  //     target: routeAux.key,
  //     canPreventDefault: true,
  //   });

  //   if (!isFocused && !event.defaultPrevented) {
  //     navigation.navigate(routeAux.routes[0].name, routeAux.routes[0].params);
  //   }
  // }, [currentRoute]);

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
        console.log('STATE INDEX', state.index);
        console.log('INDEX', index);
        console.log('ROUTE NAME', `/${route.name}`);
        console.log('CURRENT ROUTE', currentRoute);
        console.log('IS FOCUSED', isFocused);

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
            testId={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            color={isFocused ? '#FFF' : '#222'}
          />
        );
      })}
    </View>
  );
}

const styles = (height: number, width: number) =>
  StyleSheet.create({
    tabbar: {
      position: 'absolute',
      bottom: height! * 0.025,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      marginHorizontal: width * 0.005,
      // paddingVertical: 2,
      borderRadius: 5,
      shadowColor: '#000',
      // shadowOffset: { width: 0, height: 10 },
      // shadowRadius: 10,
      // shadowOpacity: 0.1,
    },
  });
