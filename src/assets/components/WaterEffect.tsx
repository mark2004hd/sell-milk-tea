import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface WaterEffectProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const WaterEffect = ({ x, y, onComplete }: WaterEffectProps) => {
  const scale = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => onComplete());
  }, []);

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          left: x - 100,
          top: y - 100,
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 150, 255, 0.3)',
  },
});

export default WaterEffect;