import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, MessageSquarePlus, MoveVertical as MoreVertical } from 'lucide-react-native';
import ChatListItem from '@/components/chat/ChatListItem';
import SearchBar from '@/components/common/SearchBar';
import { useChatStore } from '@/store/useChatStore';
import colors from '@/constants/colors';

export default function ChatsScreen() {
  const router = useRouter();
  const { chats, fetchChats } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);
  
  const filteredChats = searchQuery
    ? chats.filter(chat => {
        const name = chat.type === 'group' ? chat.name : chat.participants[0]?.name;
        return name?.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : chats;
  
  const handleNewChat = () => {
    // In a real app, this would navigate to contacts or new chat screen
    alert('Create new chat');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton}>
          <Camera size={22} color={colors.textOnPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerButton}>
          <MoreVertical size={22} color={colors.textOnPrimary} />
        </TouchableOpacity>
      </View>
      
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search chats"
      />
      
      {filteredChats.length === 0 && searchQuery ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No chats found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ChatListItem chat={item} />}
          style={styles.list}
        />
      )}
      
      <TouchableOpacity 
        style={styles.newChatButton}
        onPress={handleNewChat}
      >
        <MessageSquarePlus size={24} color={colors.textOnPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primaryDark,
  },
  headerButton: {
    marginLeft: 24,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  newChatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});