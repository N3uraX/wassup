import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Phone, PhoneOutgoing, PhoneMissed, Video } from 'lucide-react-native';
import Avatar from '@/components/common/Avatar';
import { CallHistory } from '@/types';
import { formatChatListTime } from '@/utils/date';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/useThemeStore';

interface CallItemProps {
  call: CallHistory;
  onPress?: () => void;
}

export default function CallItem({ call, onPress }: CallItemProps) {
  const { user, timestamp, type, status, duration } = call;
  const { theme } = useThemeStore();
  
  const getCallIcon = () => {
    if (status === 'missed') {
      return <PhoneMissed size={16} color={colors.callMissed} />;
    } else if (status === 'outgoing') {
      return <PhoneOutgoing size={16} color={colors.callOutgoing} />;
    } else {
      return <Phone size={16} color={colors.callIncoming} />;
    }
  };
  
  const getCallStatusText = () => {
    if (status === 'missed') {
      return 'Missed';
    } else if (status === 'outgoing') {
      return 'Outgoing';
    } else {
      return 'Incoming';
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : colors.background }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Avatar 
        uri={user.avatar} 
        size={50} 
        name={user.name}
        showPlaceholder={!user.avatar}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {user.name}
          </Text>
          <Text style={styles.time}>
            {formatChatListTime(timestamp)}
          </Text>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.callInfoContainer}>
            {getCallIcon()}
            <Text 
              style={[
                styles.callStatus, 
                status === 'missed' ? styles.missedCall : null
              ]} 
              numberOfLines={1}
            >
              {getCallStatusText()}
              {duration && ` • ${duration}`}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.callButton}>
            {type === 'video' ? (
              <Video size={20} color={colors.primary} />
            ) : (
              <Phone size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  callStatus: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  missedCall: {
    color: colors.callMissed,
  },
  callButton: {
    padding: 8,
  },
});