import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '@/components/common/Avatar';
import BadgeCount from '@/components/common/BadgeCount';
import MessageStatus from '@/components/common/MessageStatus';
import { formatChatListTime } from '@/utils/date';
import { Chat } from '@/types';
import colors from '@/constants/colors';
import { useChatStore } from '@/store/useChatStore';
import { useThemeStore } from '@/store/useThemeStore';

interface ChatListItemProps {
  chat: Chat;
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const router = useRouter();
  const { archiveChat, deleteChat, toggleRead, unarchiveChat } = useChatStore();
  const { theme } = useThemeStore();
  const { id, type, participants, lastMessage, unreadCount, isArchived } = chat;
  const avatar = type === 'group' ? chat.avatar : participants[0]?.avatar;
  const name = type === 'group' ? chat.name : participants[0]?.name;
  const isOnline = type === 'individual' ? participants[0]?.isOnline : false;

  const handlePress = () => {
    router.push(`/chat/${id}`);
  };

  // Swipe actions (simple UI for demo)
  const [showActions, setShowActions] = React.useState(false);

  return (
    <View style={{ position: 'relative' }}>
      {showActions && (
        <View style={[styles.actionsRow, { backgroundColor: theme === 'dark' ? '#222' : '#f2f2f2' }]}>
          {!isArchived && (
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme === 'dark' ? '#333' : '#e9ecef' }]} onPress={() => archiveChat(id)}>
              <Text style={styles.actionText}>Archive</Text>
            </TouchableOpacity>
          )}
          {isArchived && (
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme === 'dark' ? '#333' : '#e9ecef' }]} onPress={() => unarchiveChat(id)}>
              <Text style={styles.actionText}>Unarchive</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme === 'dark' ? '#333' : '#e9ecef' }]} onPress={() => deleteChat(id)}>
            <Text style={[styles.actionText, { color: '#e74c3c' }]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme === 'dark' ? '#333' : '#e9ecef' }]} onPress={() => toggleRead(id)}>
            <Text style={styles.actionText}>Mark {unreadCount > 0 ? 'Read' : 'Unread'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : colors.background }]}
        onPress={handlePress}
        onLongPress={() => setShowActions(v => !v)}
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
            {unreadCount > 0 && <BadgeCount count={unreadCount} size="medium" />}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  actionBtn: {
    marginLeft: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
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