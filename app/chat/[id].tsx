import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ImageBackground
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import { useChatStore } from '@/store/useChatStore';
import colors from '@/constants/colors';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { chats, setActiveChat, sendMessage, activeChat } = useChatStore();
  const flatListRef = useRef<FlatList>(null);
  
  useEffect(() => {
    if (id) {
      setActiveChat(id);
    }
    
    return () => {
      // Clear active chat on unmount
      setActiveChat('');
    };
  }, [id, setActiveChat]);
  
  const handleSendMessage = (text: string) => {
    if (id) {
      sendMessage(id, text);
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };
  
  if (!activeChat) return null;
  
  return (
    <View style={styles.container}>
      <ChatHeader chat={activeChat} />
      
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <FlatList
          ref={flatListRef}
          data={activeChat.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          style={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />
      </ImageBackground>
      
      <ChatInput onSend={handleSendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.1,
  },
  messagesList: {
    flex: 1,
    paddingVertical: 16,
  },
});