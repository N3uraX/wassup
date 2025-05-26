import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image } from 'react-native';
import { Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '@/components/common/Avatar';
import { mockUsers } from '@/assets/data/mockData';
import { useCommunitiesStore } from '@/store/useCommunitiesStore';
import { useThemeStore } from '@/store/useThemeStore';
import colors from '@/constants/colors';

export default function CommunitiesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [icon, setIcon] = useState<string | null>(null);
  const { communities, addCommunity } = useCommunitiesStore();
  const { theme } = useThemeStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleToggleMember = (userId: string) => {
    setSelectedMembers(members =>
      members.includes(userId)
        ? members.filter(id => id !== userId)
        : [...members, userId]
    );
  };

  const handleCreateCommunity = () => {
    if (name.trim()) {
      addCommunity({ name, description, icon: icon || undefined, members: selectedMembers });
      setName('');
      setDescription('');
      setIcon(null);
      setSelectedMembers([]);
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : colors.background }} edges={['top', 'left', 'right']}>
      <View style={[styles.headerRow, { paddingTop: insets.top + 8, backgroundColor: theme === 'dark' ? '#000' : colors.background }]}> 
        <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>Communities</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.newCommunityButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>+ New Community</Text>
        </TouchableOpacity>
        <FlatList
          data={communities}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              // @ts-ignore: route exists for community details
              onPress={() => router.push(`/community-details?id=${item.id}`)}
              style={[
                styles.communityItem,
                { backgroundColor: theme === 'dark' ? '#111' : '#f2f2f2' },
              ]}
            >
              <Text style={styles.communityName}>{item.name}</Text>
              <Text style={styles.communityDesc}>{item.description}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No communities yet.</Text>}
        />
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme === 'dark' ? '#111' : '#fff' }]}>
              <Text style={styles.modalTitle}>Create Community</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000', borderColor: theme === 'dark' ? '#333' : '#ddd' },
                ]}
                placeholder="Community Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000', borderColor: theme === 'dark' ? '#333' : '#ddd' },
                ]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              {/* Icon picker (UI only) */}
              <TouchableOpacity style={[
                styles.iconPicker,
                { backgroundColor: theme === 'dark' ? '#222' : '#eee', borderColor: theme === 'dark' ? '#333' : '#ddd' },
              ]}>
                {icon ? (
                  <Image source={{ uri: icon }} style={styles.iconImage} />
                ) : (
                  <View style={[styles.iconPlaceholder, { backgroundColor: theme === 'dark' ? '#222' : '#eee', borderColor: theme === 'dark' ? '#333' : '#ddd' }]}>
                    <Camera size={28} color="#888" />
                    <Text style={{ color: '#888', fontSize: 12 }}>Add Icon</Text>
                  </View>
                )}
              </TouchableOpacity>
              {/* Member selection */}
              <Text style={styles.sectionLabel}>Add Members</Text>
              <FlatList
                data={mockUsers}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.memberItem, selectedMembers.includes(item.id) && styles.memberSelected]}
                    onPress={() => handleToggleMember(item.id)}
                  >
                    <Avatar uri={item.avatar} size={44} name={item.name} />
                    <Text style={styles.memberName}>{item.name.split(' ')[0]}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingVertical: 8 }}
              />
              <TouchableOpacity style={styles.createButton} onPress={handleCreateCommunity}>
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    // backgroundColor: colors.background, // Removed hardcoded backgroundColor
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  container: { flex: 1 },
  newCommunityButton: {
    backgroundColor: '#25D366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  communityItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  communityName: { fontWeight: 'bold', fontSize: 16 },
  communityDesc: { color: '#555', marginTop: 4 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 32 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 24,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  iconPicker: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconImage: { width: '100%', height: '100%', borderRadius: 8 },
  iconPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    width: '100%',
  },
  memberItem: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
  },
  memberSelected: {
    borderWidth: 2,
    borderColor: '#25D366',
  },
  memberName: { marginTop: 4, fontSize: 14, fontWeight: '500' },
  createButton: {
    backgroundColor: '#25D366',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  createButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelText: { color: '#25D366', marginTop: 8 },
});
