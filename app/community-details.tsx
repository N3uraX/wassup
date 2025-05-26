import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCommunitiesStore } from '@/store/useCommunitiesStore';
import { mockUsers } from '@/assets/data/mockData';
import Avatar from '@/components/common/Avatar';
import { useThemeStore } from '@/store/useThemeStore';

export default function CommunityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { communities } = useCommunitiesStore();
  const { theme } = useThemeStore();
  const router = useRouter();

  const community = communities.find(c => c.id === id);
  if (!community) return <Text style={{ margin: 32 }}>Community not found.</Text>;

  const members = (community.members || []).map(
    memberId => mockUsers.find(u => u.id === memberId)
  ).filter(Boolean);

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: 'transparent' }]}>
        {community.icon ? (
          <Image source={{ uri: community.icon }} style={styles.icon} />
        ) : (
          <View style={[styles.iconPlaceholder, { backgroundColor: theme === 'dark' ? '#222' : '#eee' }]} />
        )}
        <Text style={styles.name}>{community.name}</Text>
        <Text style={styles.desc}>{community.description}</Text>
      </View>
      <Text style={styles.sectionTitle}>Members</Text>
      <FlatList
        data={members}
        keyExtractor={item => item?.id ?? Math.random().toString()}
        renderItem={({ item }) => {
          if (!item) return null;
          return (
            <View style={styles.memberRow}>
              <Avatar uri={item.avatar} size={44} name={item.name} />
              <Text style={styles.memberName}>{item.name}</Text>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>No members yet.</Text>}
      />
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join / Leave Community</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { alignItems: 'center', marginBottom: 24 },
  icon: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  iconPlaceholder: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  desc: { color: '#555', marginBottom: 8, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  memberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  memberName: { marginLeft: 12, fontSize: 16 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 24 },
  joinButton: {
    backgroundColor: '#25D366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  joinButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
