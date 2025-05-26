import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { mockUsers } from '@/assets/data/mockData';
import Avatar from '@/components/common/Avatar';
import { useChatStore } from '@/store/useChatStore';
import { useThemeStore } from '@/store/useThemeStore';

export default function ContactSelectorScreen() {
  const router = useRouter();
  const { addChat } = useChatStore();
  const { theme } = useThemeStore();

  const handleSelect = (userId: string) => {
    addChat([userId], false);
    router.push(`/chat/${userId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <Text style={styles.title}>Select Contact</Text>
      <FlatList
        data={mockUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item.id)}>
            <Avatar uri={item.avatar} size={44} name={item.name} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  info: { marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  status: { color: '#888', fontSize: 13 },
});
