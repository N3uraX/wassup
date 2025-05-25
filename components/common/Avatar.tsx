import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import colors from '@/constants/colors';

interface AvatarProps {
  uri: string;
  size?: number;
  showStatus?: boolean;
  isOnline?: boolean;
  name?: string;
  showPlaceholder?: boolean;
}

export default function Avatar({ 
  uri, 
  size = 40, 
  showStatus = false, 
  isOnline = false,
  name = '',
  showPlaceholder = false 
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const hasValidUri = uri && uri.trim() !== '';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {hasValidUri ? (
        <Image 
          source={{ uri }} 
          style={[styles.image, { width: size, height: size }]} 
        />
      ) : showPlaceholder ? (
        <View style={[
          styles.placeholderContainer, 
          { width: size, height: size, backgroundColor: colors.primaryLight }
        ]}>
          <Text style={[styles.placeholderText, { fontSize: size * 0.4 }]}>
            {initials}
          </Text>
        </View>
      ) : null}
      
      {showStatus && (
        <View 
          style={[
            styles.statusDot, 
            { 
              backgroundColor: isOnline ? colors.online : 'transparent',
              borderColor: isOnline ? colors.background : colors.textTertiary,
              right: size * 0.05,
              bottom: size * 0.05,
              width: size * 0.3,
              height: size * 0.3,
              borderWidth: isOnline ? 2 : 1
            }
          ]} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 1000,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 1000,
  },
  statusDot: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },
  placeholderText: {
    color: colors.textOnPrimary,
    fontWeight: '600',
  }
});