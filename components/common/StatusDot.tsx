import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

interface StatusDotProps {
  size?: number;
  color?: string;
  outline?: boolean;
  outlineColor?: string;
  outlineWidth?: number;
}

export default function StatusDot({
  size = 12,
  color = colors.badge,
  outline = false,
  outlineColor = colors.background,
  outlineWidth = 2,
}: StatusDotProps) {
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderWidth: outline ? outlineWidth : 0,
          borderColor: outlineColor,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 1000,
  },
});