import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Avatar from '@/components/common/Avatar';
import { ArrowLeft, MoveVertical as MoreVertical, Phone, Video } from 'lucide-react-native';
import colors from '@/constants/colors';
import { formatLastSeen } from '@/utils/date';
import { Chat } from '@/types';

interface ChatHeaderProps {
  chat: Chat;
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  const router = useRouter();
  
  const { type, participants } = chat;
  
  const avatar = type === 'group' ? chat.avatar : participants[0]?.avatar;
  const name = type === 'group' ? chat.name : participants[0]?.name;
  const isOnline = type === 'individual' ? participants[0]?.isOnline : false;
  const lastSeen = type === 'individual' ? participants[0]?.lastSeen : '';
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.textOnPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.8}>
          <Avatar 
            uri={avatar || ''} 
            size={40} 
            showStatus={false}
            name={name}
            showPlaceholder={!avatar}
          />
          
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            
            {type === 'individual' && (
              <Text style={styles.status} numberOfLines={1}>
                {formatLastSeen(lastSeen, isOnline)}
              </Text>
            )}
            
            {type === 'group' && (
              <Text style={styles.status} numberOfLines={1}>
                {participants.length} participants
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Video size={22} color={colors.textOnPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={22} color={colors.textOnPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MoreVertical size={22} color={colors.textOnPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryDark,
    paddingTop: Platform.OS === 'web' ? 8 : 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    height: Platform.OS === 'web' ? 64 : 64,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textOnPrimary,
  },
  status: {
    fontSize: 12,
    color: colors.textOnPrimary,
    opacity: 0.8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});