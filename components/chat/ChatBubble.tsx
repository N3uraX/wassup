import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatMessageTime } from '@/utils/date';
import MessageStatus from '@/components/common/MessageStatus';
import { Message } from '@/types';
import colors from '@/constants/colors';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { isMe, text, timestamp, status, media } = message;
  
  const formattedTime = formatMessageTime(timestamp);
  
  return (
    <View style={[
      styles.container,
      isMe ? styles.myMessage : styles.theirMessage
    ]}>
      <View style={[
        styles.bubble,
        isMe ? styles.myBubble : styles.theirBubble
      ]}>
        {media && media.length > 0 && media[0].type === 'image' && (
          <Image 
            source={{ uri: media[0].url }} 
            style={styles.mediaImage} 
            resizeMode="cover"
          />
        )}
        
        <Text style={styles.text}>{text}</Text>
        
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formattedTime}</Text>
          {isMe && (
            <MessageStatus status={status} size={14} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    marginHorizontal: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 18, // Space for time
  },
  myBubble: {
    backgroundColor: colors.messageBubbleOut,
    borderTopRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: colors.messageBubbleIn,
    borderTopLeftRadius: 2,
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  timeContainer: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 11,
    color: colors.textTertiary,
    marginRight: 4,
  },
  mediaImage: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 8,
  },
});