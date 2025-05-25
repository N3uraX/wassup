import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '@/components/common/Avatar';
import { StatusUpdate } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import colors from '@/constants/colors';

interface StatusItemProps {
  status: StatusUpdate;
  isViewed?: boolean;
}

export default function StatusItem({ status, isViewed = false }: StatusItemProps) {
  const router = useRouter();
  const { id, user, timestamp, content } = status;
  
  const timeSince = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  const handlePress = () => {
    router.push(`/status/${id}`);
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
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
        <View 
          style={[
            styles.statusRing, 
            isViewed ? styles.viewedRing : styles.unviewedRing
          ]} 
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.time} numberOfLines={1}>
          {timeSince}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  avatarContainer: {
    position: 'relative',
  },
  statusRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 1000,
    borderWidth: 2,
  },
  unviewedRing: {
    borderColor: colors.primary,
  },
  viewedRing: {
    borderColor: colors.textTertiary,
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
  time: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});