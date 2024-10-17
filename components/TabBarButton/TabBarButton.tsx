/* eslint-disable import/order */
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
      style={styles(isFocused).tabbarItem}
    >
      <Animated.View style={[{}, animatedIconStyle]}>
        {icon(name, color)}
      </Animated.View>
      <Animated.Text
        style={[
          { color: `${color}`, fontSize: 15, fontWeight: 'bold' },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = (isFocused?: boolean) =>
  StyleSheet.create({
    tabbarItem: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 10,
      top: 5,
      backgroundColor: isFocused ? 'orange' : 'transparent',
      width: '20%',
      height: 50,
      borderRadius: 30,
    },
  });
