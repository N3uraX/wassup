import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '@/components/common/Avatar';
import BadgeCount from '@/components/common/BadgeCount';
import MessageStatus from '@/components/common/MessageStatus';
import { formatChatListTime } from '@/utils/date';
import { Chat } from '@/types';
import colors from '@/constants/colors';

interface ChatListItemProps {
  chat: Chat;
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const router = useRouter();
  
  const { id, type, participants, lastMessage, unreadCount } = chat;
  
  const avatar = type === 'group' ? chat.avatar : participants[0]?.avatar;
  const name = type === 'group' ? chat.name : participants[0]?.name;
  const isOnline = type === 'individual' ? participants[0]?.isOnline : false;
  
  const handlePress = () => {
    router.push(`/chat/${id}`);
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Avatar 
        uri={avatar || ''} 
        size={50} 
        showStatus={type === 'individual'} 
        isOnline={isOnline}
        name={name}
        showPlaceholder={!avatar}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.time}>
            {lastMessage ? formatChatListTime(lastMessage.timestamp) : ''}
          </Text>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.messageContainer}>
            {lastMessage?.isMe && (
              <MessageStatus status={lastMessage.status} size={14} />
            )}
            <Text style={styles.message} numberOfLines={1}>
              {lastMessage?.isMe && '• '}
              {lastMessage?.text || ''}
            </Text>
          </View>
          
          {unreadCount > 0 && (
            <BadgeCount count={unreadCount} size="medium" />
          )}
        </View>
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
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});