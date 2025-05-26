import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '@/components/common/Avatar';
import { Plus } from 'lucide-react-native';
import { User } from '@/types';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/useThemeStore';

interface MyStatusItemProps {
  user: User;
  hasStatus?: boolean;
  onAddStatus?: () => void;
}

export default function MyStatusItem({ 
  user, 
  hasStatus = false,
  onAddStatus 
}: MyStatusItemProps) {
  const router = useRouter();
  const { theme } = useThemeStore();
  
  const handlePress = () => {
    if (hasStatus) {
      router.push('/status/my');
    } else {
      onAddStatus?.();
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : colors.background }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Avatar 
          uri={user.avatar} 
          size={50} 
          name={user.name}
          showPlaceholder={!user.avatar}
        />
        <View style={[styles.addButtonContainer, { backgroundColor: theme === 'dark' ? '#000' : colors.background }]}> 
          <View style={styles.addButton}>
            <Plus size={16} color={colors.textOnPrimary} />
          </View>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>
          My Status
        </Text>
        <Text style={styles.hint} numberOfLines={1}>
          {hasStatus ? 'Tap to view your status' : 'Tap to add status update'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  avatarContainer: {
    position: 'relative',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    borderRadius: 1000,
    padding: 2,
  },
  addButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  hint: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});