import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { Phone as PhonePlus, MoveVertical as MoreVertical } from 'lucide-react-native';
import CallItem from '@/components/calls/CallItem';
import SearchBar from '@/components/common/SearchBar';
import { useCallsStore } from '@/store/useCallsStore';
import colors from '@/constants/colors';

export default function CallsScreen() {
  const { calls, fetchCalls } = useCallsStore();
  const [searchQuery, setSearchQuery] = useState('');
  
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
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton}>
          <MoreVertical size={22} color={colors.textOnPrimary} />
        </TouchableOpacity>
      </View>
      
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search calls"
      />
      
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
        <PhonePlus size={24} color={colors.textOnPrimary} />
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