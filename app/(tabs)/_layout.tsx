import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Phone, UsersRound, MessageSquare, Settings, Clock } from 'lucide-react-native';
import StatusDot from '@/components/common/StatusDot';
import BadgeCount from '@/components/common/BadgeCount';
import { useChatStore } from '@/store/useChatStore';
import { useStatusStore } from '@/store/useStatusStore';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/useThemeStore';

export default function TabLayout() {
  const { chats } = useChatStore();
  const { statusUpdates, viewedStatuses } = useStatusStore();
  const { theme } = useThemeStore();
  const insets = useSafeAreaInsets();

  // Calculate total unread messages
  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  // Calculate unread status updates
  const unreadStatusCount = statusUpdates.filter(
    status => !viewedStatuses.includes(status.id)
  ).length;

  // Set status bar style based on theme
  useEffect(() => {
    StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, [theme]);

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme === 'dark' ? '#25D366' : '#25D366',
          tabBarInactiveTintColor: theme === 'dark' ? '#b0b0b0' : '#888',
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: theme === 'dark' ? '#000' : '#fff',
              borderTopColor: theme === 'dark' ? '#222' : '#e0e0e0',
              paddingBottom: 24,
            },
          ],
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.tabLabel,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 56 + insets.top,
          },
          headerTitleStyle: {
            color: theme === 'dark' ? '#fff' : '#222',
            fontSize: 20,
            fontFamily: 'Inter-SemiBold',
            textAlign: 'left',
          },
          headerTitleAlign: 'left',
          headerTransparent: true,
          headerTintColor: theme === 'dark' ? '#fff' : '#222',
        }}
      >
        <Tabs.Screen
          name="updates"
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <Clock size={size} color={color} /> // Use a distinct icon for Updates
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="calls"
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <Phone size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="communities"
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <UsersRound size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <MessageSquare size={size} color={color} /> // Restore chat icon to Chats
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: '',
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: 72, // Expand bar height for better spacing
    paddingBottom: 24, // More padding to avoid overlay with phone bottom
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});