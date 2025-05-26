import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { mockUsers } from '@/assets/data/mockData';
import Avatar from '@/components/common/Avatar';
import { useChatStore } from '@/store/useChatStore';
import { useThemeStore } from '@/store/useThemeStore';

export default function CreateGroupScreen() {
  const router = useRouter();
  const { addChat } = useChatStore();
  const { theme } = useThemeStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');

  const handleToggle = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(i => i !== id) : [...sel, id]);
  };

  const handleCreate = () => {
    if (selected.length > 1 && groupName.trim()) {
      addChat(selected, true, groupName.trim());
      // @ts-ignore: route exists for group creation
      router.push('/(tabs)/index');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <Text style={styles.title}>Create Group</Text>
      <Text style={styles.label}>Group Name</Text>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Enter group name"
      />
      <Text style={styles.label}>Select Members</Text>
      <FlatList
        data={mockUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selected.includes(item.id) && { backgroundColor: theme === 'dark' ? '#112d1a' : '#e6f7ef' },
            ]}
            onPress={() => handleToggle(item.id)}
          >
            <Avatar uri={item.avatar} size={44} name={item.name} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreate} disabled={selected.length < 2 || !groupName.trim()}>
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eee' },
  info: { marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  status: { color: '#888', fontSize: 13 },
  createButton: { backgroundColor: '#25D366', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  createButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
