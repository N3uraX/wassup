import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStatusStore } from '@/store/useStatusStore';
import { useCommunitiesStore } from '@/store/useCommunitiesStore';
import { getCurrentUser } from '@/assets/data/mockData';
import MyStatusItem from '@/components/status/MyStatusItem';
import StatusItem from '@/components/status/StatusItem';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/useThemeStore';

const SEGMENTS = ['All', 'Status', 'Communities'] as const;
type Segment = typeof SEGMENTS[number];

export default function UpdatesScreen() {
  const [segment, setSegment] = useState<Segment>('All');
  const { statusUpdates, viewedStatuses } = useStatusStore();
  const { communities } = useCommunitiesStore();
  const currentUser = getCurrentUser();
  const { theme } = useThemeStore();
  const insets = useSafeAreaInsets();

  // Separate my status and others
  const myStatus = statusUpdates.find(s => s.user.id === currentUser.id);
  const othersStatus = statusUpdates.filter(s => s.user.id !== currentUser.id);

  // UI for segmented control
  const renderSegmentedControl = () => (
    <View style={[styles.segmentedControl, { backgroundColor: theme === 'dark' ? '#181a1b' : colors.background, borderColor: theme === 'dark' ? '#222' : colors.divider }]}> 
      {SEGMENTS.map(seg => (
        <TouchableOpacity
          key={seg}
          style={[
            styles.segmentButton,
            { backgroundColor: theme === 'dark' ? '#181a1b' : colors.background },
            segment === seg && { backgroundColor: theme === 'dark' ? '#222' : colors.primaryLight }
          ]}
          onPress={() => setSegment(seg)}
        >
          <Text style={[
            styles.segmentText,
            { color: theme === 'dark' ? '#aaa' : colors.textSecondary },
            segment === seg && { color: theme === 'dark' ? colors.primaryLight : colors.primary, fontWeight: 'bold' }
          ]}>
            {seg}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  let content: React.ReactNode = null;
  if (segment === 'All') {
    content = (
      <>
        <Text style={styles.sectionTitle}>Status</Text>
        <FlatList
          data={othersStatus}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<MyStatusItem user={currentUser} hasStatus={!!myStatus} />}
          renderItem={({ item }) => (
            <StatusItem status={item} isViewed={viewedStatuses.includes(item.id)} />
          )}
          contentContainerStyle={styles.statusList}
        />
        <Text style={styles.sectionTitle}>Communities</Text>
        <FlatList
          data={communities}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.communityItem}>
              <Text style={styles.communityName}>{item.name}</Text>
            </View>
          )}
        />
      </>
    );
  } else if (segment === 'Status') {
    content = (
      <FlatList
        data={statusUpdates}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <StatusItem status={item} isViewed={viewedStatuses.includes(item.id)} />
        )}
        ListHeaderComponent={<MyStatusItem user={currentUser} hasStatus={!!myStatus} />}
      />
    );
  } else if (segment === 'Communities') {
    content = (
      <FlatList
        data={communities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.communityItem}>
            <Text style={[styles.communityName, { color: theme === 'dark' ? '#fff' : '#222' }]}>{item.name}</Text>
            {item.description ? (
              <Text style={[styles.communityDesc, { color: theme === 'dark' ? '#aaa' : '#555' }]}>{item.description}</Text>
            ) : null}
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: theme === 'dark' ? '#aaa' : '#888', textAlign: 'center', marginTop: 32 }}>No communities yet.</Text>}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : colors.background }} edges={['top', 'left', 'right']}> 
      <View style={[styles.headerRow, { paddingTop: insets.top + 8, backgroundColor: theme === 'dark' ? '#000' : colors.background }]}> 
        <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>Updates</Text>
      </View>
      <View style={{ flex: 1 }}>
        {renderSegmentedControl()}
        {segment === 'Communities' ? (
          <FlatList
            data={communities}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.communityItem}>
                <Text style={[styles.communityName, { color: theme === 'dark' ? '#fff' : '#222' }]}>{item.name}</Text>
                {item.description ? (
                  <Text style={[styles.communityDesc, { color: theme === 'dark' ? '#aaa' : '#555' }]}>{item.description}</Text>
                ) : null}
              </View>
            )}
            ListEmptyComponent={<Text style={{ color: theme === 'dark' ? '#aaa' : '#888', textAlign: 'center', marginTop: 32 }}>No communities yet.</Text>}
          />
        ) : content}
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
    // backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  segmentedControl: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentButtonActive: {
  },
  segmentText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  segmentTextActive: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 4,
    color: colors.textPrimary,
  },
  statusList: { paddingLeft: 8, paddingBottom: 16 },
  communityItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  communityName: { fontSize: 16 },
  communityDesc: { fontSize: 14 },
});
