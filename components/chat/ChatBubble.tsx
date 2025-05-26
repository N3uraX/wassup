import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatMessageTime } from '@/utils/date';
import MessageStatus from '@/components/common/MessageStatus';
import { Message } from '@/types';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/useThemeStore';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { isMe, text, timestamp, status, media } = message;

  const formattedTime = formatMessageTime(timestamp);
  const { theme } = useThemeStore();

  return (
    <View style={[styles.bubbleRow, isMe ? styles.bubbleRowMe : styles.bubbleRowOther]}>
      <View style={[
        styles.bubble,
        isMe
          ? { backgroundColor: theme === 'dark' ? colors.darkBubbleOut : '#dcf8c6', borderTopRightRadius: 0 }
          : { backgroundColor: theme === 'dark' ? colors.darkBubbleIn : '#fff', borderTopLeftRadius: 0, borderWidth: 1, borderColor: '#ececec' },
      ]}>
        {media && media.length > 0 && (
          <Image source={{ uri: media[0].url }} style={styles.image} />
        )}
        <Text style={styles.text}>{text}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.time}>{formattedTime}</Text>
          {isMe && <MessageStatus status={status} size={14} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleRow: {
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: 8,
  },
  bubbleRowMe: {
    justifyContent: 'flex-end',
  },
  bubbleRowOther: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: '#222',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  time: {
    fontSize: 11,
    color: '#888',
    marginRight: 4,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginBottom: 6,
  },
});