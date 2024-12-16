/* eslint-disable import/order */
import { useEffect } from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { icon } from '@/constants/Icons';

interface TabBarButtonProps {
  label: any;
  name: string;
  isFocused: boolean;
  tabBarAccessibilityLabel: string | undefined;
  testId: string | undefined;
  onPress: () => void;
  onLongPress: () => void;
  color: string;
}

export const TabBarButton = ({
  label,
  name,
  isFocused,
  tabBarAccessibilityLabel,
  testId,
  onPress,
  onLongPress,
  color,
}: TabBarButtonProps) => {
  const scale = useSharedValue(0);
  const fontScale = useWindowDimensions().fontScale;

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  return (
    <Pressable
      key={name}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={tabBarAccessibilityLabel}
      testID={testId}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles({ isFocused }).tabbarItem}
    >
      <Animated.View style={[{}, animatedIconStyle]}>
        {icon(name, color)}
      </Animated.View>
      <Animated.Text
        style={[styles({ fontScale, color }).labelText, animatedTextStyle]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

interface StylesProps {
  isFocused?: boolean;
  color?: string;
  fontScale?: number;
}

const styles = ({ isFocused, fontScale, color }: StylesProps) =>
  StyleSheet.create({
    tabbarItem: {
      justifyContent: 'center',
      alignItems: 'center',
      top: 5,
      backgroundColor: isFocused ? 'orange' : 'transparent',
      width: '20%',
      height: 58,
      borderRadius: 20,
    },
    labelText: {
      color: color!,
      fontSize: fontScale! < 1 ? 21 : fontScale! > 1 ? 13 : 17,
      fontWeight: 'bold',
    },
  });
