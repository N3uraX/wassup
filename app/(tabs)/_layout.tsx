import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { MessageSquare, Phone, Camera, Settings } from 'lucide-react-native';
import StatusDot from '@/components/common/StatusDot';
import BadgeCount from '@/components/common/BadgeCount';
import colors from '@/constants/colors';
import { useChatStore } from '@/store/useChatStore';
import { useStatusStore } from '@/store/useStatusStore';

export default function TabLayout() {
  const { chats } = useChatStore();
  const { statusUpdates, viewedStatuses } = useStatusStore();
  
  // Calculate total unread messages
  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  
  // Calculate unread status updates
  const unreadStatusCount = statusUpdates.filter(
    status => !viewedStatuses.includes(status.id)
  ).length;
  
  const hasUnreadStatus = unreadStatusCount > 0;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.icon,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: colors.textOnPrimary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <View>
              <MessageSquare size={size} color={color} />
              {totalUnreadCount > 0 && (
                <BadgeCount count={totalUnreadCount} size="small" />
              )}
            </View>
          ),
          headerTitle: 'WhatsApp',
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: 'Calls',
          tabBarIcon: ({ color, size }) => (
            <Phone size={size} color={color} />
          ),
          headerTitle: 'Calls',
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: 'Status',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Camera size={size} color={color} />
              {hasUnreadStatus && (
                <View style={styles.statusIndicator}>
                  <StatusDot size={8} color={colors.badge} outline />
                </View>
              )}
            </View>
          ),
          headerTitle: 'Status',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
          headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.divider,
    height: 60,
    paddingBottom: 6,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  header: {
    backgroundColor: colors.primaryDark,
  },
  headerTitle: {
    color: colors.textOnPrimary,
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  statusIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
});