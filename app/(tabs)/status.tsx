import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text,
  ScrollView
} from 'react-native';
import { Camera, MoveVertical as MoreVertical, Plus } from 'lucide-react-native';
import StatusItem from '@/components/status/StatusItem';
import MyStatusItem from '@/components/status/MyStatusItem';
import { useStatusStore } from '@/store/useStatusStore';
import { useAuthStore } from '@/store/useAuthStore';
import colors from '@/constants/colors';

export default function StatusScreen() {
  const { user } = useAuthStore();
  const { statusUpdates, viewedStatuses, fetchStatusUpdates } = useStatusStore();
  
  useEffect(() => {
    fetchStatusUpdates();
  }, [fetchStatusUpdates]);
  
  // Filter out expired statuses (24 hours)
  const validStatuses = statusUpdates.filter(status => 
    new Date(status.expiresAt) > new Date()
  );
  
  // Separate viewed and unviewed statuses
  const unviewedStatuses = validStatuses.filter(status => 
    !viewedStatuses.includes(status.id)
  );
  
  const viewedStatusList = validStatuses.filter(status => 
    viewedStatuses.includes(status.id)
  );
  
  const handleAddStatus = () => {
    // In a real app, this would open the camera/status creator
    alert('Create new status');
  };
  
  const hasMyStatus = validStatuses.some(status => status.user.id === 'me');
  
  if (!user) return null;
  
  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton}>
          <MoreVertical size={22} color={colors.textOnPrimary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <MyStatusItem 
          user={user} 
          hasStatus={hasMyStatus}
          onAddStatus={handleAddStatus}
        />
        
        {unviewedStatuses.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Recent updates</Text>
            {unviewedStatuses.map(status => (
              <StatusItem 
                key={status.id}
                status={status}
                isViewed={false}
              />
            ))}
          </View>
        )}
        
        {viewedStatusList.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Viewed updates</Text>
            {viewedStatusList.map(status => (
              <StatusItem 
                key={status.id}
                status={status}
                isViewed={true}
              />
            ))}
          </View>
        )}
        
        {validStatuses.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No status updates</Text>
            <Text style={styles.emptyText}>
              Status updates from your contacts will appear here
            </Text>
          </View>
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={handleAddStatus}
      >
        <Camera size={24} color={colors.textOnPrimary} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.addTextStatusButton}
        onPress={handleAddStatus}
      >
        <Plus size={18} color={colors.textPrimary} />
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
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundDark,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
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
  cameraButton: {
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
  addTextStatusButton: {
    position: 'absolute',
    right: 28,
    bottom: 90,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: colors.divider,
  },
});