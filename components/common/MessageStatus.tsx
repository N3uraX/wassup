import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Check, CheckCheck } from 'lucide-react-native';
import colors from '@/constants/colors';

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read';
  size?: number;
}

export default function MessageStatus({ status, size = 16 }: MessageStatusProps) {
  const getColor = () => {
    switch (status) {
      case 'sent':
        return colors.sent;
      case 'delivered':
        return colors.delivered;
      case 'read':
        return colors.read;
      default:
        return colors.sent;
    }
  };

  return (
    <View style={styles.container}>
      {status === 'sent' && (
        <Check size={size} color={getColor()} />
      )}
      {(status === 'delivered' || status === 'read') && (
        <CheckCheck size={size} color={getColor()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});