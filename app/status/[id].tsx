import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text, 
  TouchableOpacity, 
  Platform,
  Animated,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MoveVertical as MoreVertical } from 'lucide-react-native';
import { useStatusStore } from '@/store/useStatusStore';
import { formatDistanceToNow } from 'date-fns';
import colors from '@/constants/colors';

export default function StatusViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { statusUpdates, markAsViewed } = useStatusStore();
  const [progress] = useState(new Animated.Value(0));
  
  const status = statusUpdates.find(s => s.id === id);
  
  useEffect(() => {
    if (status) {
      markAsViewed(status.id);
      
      // Animate progress bar
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000, // 5 seconds per status
        useNativeDriver: false,
      }).start(() => {
        // Auto close after animation completes
        setTimeout(() => {
          router.back();
        }, 500);
      });
    }
  }, [status, markAsViewed, progress, router]);
  
  const handleClose = () => {
    router.back();
  };
  
  if (!status) return null;
  
  const { user, timestamp, content } = status;
  const timeSince = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  const progressInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  
  const progressStyle = {
    width: progressInterpolate,
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progress, progressStyle]} />
        </View>
        
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.textOnPrimary} />
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.timeAgo}>{timeSince}</Text>
          </View>
          
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={24} color={colors.textOnPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        {content.type === 'image' && (
          <Image 
            source={{ uri: content.media }} 
            style={styles.mediaImage}
            resizeMode="contain"
          />
        )}
        
        {content.type === 'text' && (
          <View 
            style={[
              styles.textContainer, 
              { backgroundColor: content.backgroundColor || colors.primary }
            ]}
          >
            <Text style={styles.textContent}>{content.text}</Text>
          </View>
        )}
        
        {content.text && content.type === 'image' && (
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{content.text}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: colors.textOnPrimary,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  userInfo: {
    flex: 1,
    marginLeft: 8,
  },
  userName: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  timeAgo: {
    color: colors.textOnPrimary,
    fontSize: 12,
    opacity: 0.8,
  },
  moreButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaImage: {
    width: width,
    height: height,
  },
  textContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    color: colors.textOnPrimary,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  caption: {
    color: colors.textOnPrimary,
    fontSize: 16,
    textAlign: 'center',
  },
});