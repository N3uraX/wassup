import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import ChatListItem from '@/components/chat/ChatListItem';
import SearchBar from '@/components/common/SearchBar';
import { useChatStore } from '@/store/useChatStore';
import { useThemeStore } from '@/store/useThemeStore';
import colors from '@/constants/colors';

export default function ChatsScreen() {
  const router = useRouter();
  const { chats, fetchChats } = useChatStore();
  const { theme } = useThemeStore();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [segment, setSegment] = useState<'all' | 'favorite' | 'archive'>('all');
  
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);
  
  // Only show archived chats in Archive segment, and remove from All/Favorite
  const filteredChats = chats.filter(chat => {
    if (segment === 'favorite') return chat.isFavorite && !chat.isArchived;
    if (segment === 'archive') return chat.isArchived;
    return !chat.isArchived;
  }).filter(chat => {
    const name = chat.type === 'group' ? chat.name : chat.participants[0]?.name;
    return searchQuery ? name?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });
  
  const handleNewChat = () => {
    // @ts-ignore: route exists for contact selector
    router.push('/select-contact'); // @ts-ignore: route exists for contact selector
  };
  const handleNewGroup = () => {
    // @ts-ignore: route exists for group creation
    router.push('/create-group');
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : colors.background }} edges={['top', 'left', 'right']}>
      <View style={[styles.headerRow, { paddingTop: insets.top + 8, backgroundColor: theme === 'dark' ? '#000' : colors.background }]}> 
        <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>Chats</Text>
        <TouchableOpacity onPress={handleNewChat}>
          <Plus size={26} color={theme === 'dark' ? '#25D366' : colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search chats"
        theme={theme}
      />
      <View style={[styles.segmentedControl, { backgroundColor: theme === 'dark' ? '#181a1b' : colors.background, borderColor: theme === 'dark' ? '#222' : colors.divider }]}> 
        {['all', 'favorite', 'archive'].map(key => (
          <TouchableOpacity
            key={key}
            style={[styles.segmentButton, { backgroundColor: theme === 'dark' ? '#181a1b' : colors.background }, segment === key && { backgroundColor: theme === 'dark' ? '#222' : colors.primaryLight }]}
            onPress={() => setSegment(key as any)}
          >
            <Text style={[styles.segmentText, { color: theme === 'dark' ? '#aaa' : colors.textSecondary }, segment === key && { color: theme === 'dark' ? colors.primaryLight : colors.primary }]}> 
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary, // Use the correct color key
  },
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  segmentText: {
    color: colors.textSecondary,
    fontWeight: '600',
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
});