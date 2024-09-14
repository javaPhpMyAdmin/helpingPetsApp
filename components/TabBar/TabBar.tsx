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

  return (
    <View onLayout={onTabbarLayout} style={styles(height, width).tabbar}>
      <Animated.View
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
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

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
      bottom: height * 0.008,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white', //'#ffa7a7',
      marginHorizontal: width * 0.005,
      paddingVertical: 15,
      borderRadius: 35,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      shadowOpacity: 0.1,
    },
  });
