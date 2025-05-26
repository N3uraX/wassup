import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { Phone as PhonePlus } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import CallItem from '@/components/calls/CallItem';
import { useCallsStore } from '@/store/useCallsStore';
import { useThemeStore } from '@/store/useThemeStore';
import colors from '@/constants/colors';

export default function CallsScreen() {
  const { calls, fetchCalls } = useCallsStore();
  const { theme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    fetchCalls();
  }, [fetchCalls]);
  
  const filteredCalls = searchQuery
    ? calls.filter(call => 
        call.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : calls;
  
  const handleNewCall = () => {
    // In a real app, this would navigate to contacts for calling
    alert('Start new call');
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : colors.background }} edges={['top', 'left', 'right']}>
      <View style={[styles.headerRow, { paddingTop: insets.top + 8, backgroundColor: theme === 'dark' ? '#000' : colors.background }]}> 
        <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>Calls</Text>
      </View>
      <View style={{ flex: 1 }}>
        {filteredCalls.length === 0 && searchQuery ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No calls found</Text>
          </View>
        ) : filteredCalls.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No calls yet</Text>
            <Text style={styles.emptyText}>Start calling your contacts who have WhatsApp</Text>
          </View>
        ) : (
          <FlatList
            data={filteredCalls}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CallItem call={item} />}
            style={styles.list}
          />
        )}
        <TouchableOpacity 
          style={styles.newCallButton}
          onPress={handleNewCall}
        >
          <PhonePlus size={24} color={theme === 'dark' ? '#fff' : colors.textOnPrimary} />
        </TouchableOpacity>
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
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  container: { flex: 1 },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  newCallButton: {
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