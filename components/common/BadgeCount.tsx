import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

interface BadgeCountProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  textColor?: string;
}

export default function BadgeCount({
  count,
  size = 'medium',
  color = colors.badge,
  textColor = colors.textOnPrimary
}: BadgeCountProps) {
  if (count <= 0) return null;
  
  // Size mappings
  const sizeMap = {
    small: {
      minWidth: 16,
      height: 16,
      fontSize: 10,
      paddingHorizontal: 4
    },
    medium: {
      minWidth: 20,
      height: 20,
      fontSize: 12,
      paddingHorizontal: 6
    },
    large: {
      minWidth: 24,
      height: 24,
      fontSize: 14,
      paddingHorizontal: 8
    }
  };
  
  const sizeStyle = sizeMap[size];
  
  return (
    <View 
      style={[
        styles.badge, 
        { 
          backgroundColor: color,
          minWidth: sizeStyle.minWidth,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal
        }
      ]}
    >
      <Text 
        style={[
          styles.text, 
          { 
            color: textColor,
            fontSize: sizeStyle.fontSize
          }
        ]}
        numberOfLines={1}
      >
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  }
});