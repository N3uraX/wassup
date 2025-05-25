import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Image
} from 'react-native';
import { ChevronRight, Key, BellRing, MessageSquare, Database, CircleHelp as HelpCircle, Users, Moon } from 'lucide-react-native';
import Avatar from '@/components/common/Avatar';
import { useAuthStore } from '@/store/useAuthStore';
import colors from '@/constants/colors';

export default function SettingsScreen() {
  const { user } = useAuthStore();
  const [darkMode, setDarkMode] = React.useState(false);
  
  if (!user) return null;
  
  const settingsSections = [
    {
      id: 'account',
      items: [
        {
          id: 'privacy',
          title: 'Privacy',
          icon: <Key size={22} color={colors.primary} />,
          rightElement: <ChevronRight size={20} color={colors.textTertiary} />
        },
        {
          id: 'security',
          title: 'Security',
          icon: <Key size={22} color={colors.primary} />,
          rightElement: <ChevronRight size={20} color={colors.textTertiary} />
        },
        {
          id: 'theme',
          title: 'Dark Mode',
          icon: <Moon size={22} color={colors.primary} />,
          rightElement: (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
            />
          )
        }
      ]
    },
    {
      id: 'app',
      items: [
        {
          id: 'notifications',
          title: 'Notifications',
          icon: <BellRing size={22} color={colors.primary} />,
          rightElement: <ChevronRight size={20} color={colors.textTertiary} />
        },
        {
          id: 'chats',
          title: 'Chats',
          icon: <MessageSquare size={22} color={colors.primary} />,
          rightElement: <ChevronRight size={20} color={colors.textTertiary} />
        },
        {
          id: 'storage',
          title: 'Storage and Data',
          icon: <Database size={22} color={colors.primary} />,
          rightElement: <ChevronRight size={20} color={colors.textTertiary} />
        }
      ]
    },
    {
      id: 'help',
      items: [
        {
          id: 'support',
          title: 'Help',
          icon: <HelpCircle size={22} color={colors.primary} />,
          rightElement: <ChevronRight size={20} color={colors.textTertiary} />
        },
        {
          id: 'tellFriend',
          title: 'Tell a Friend',
          icon: <Users size={22} color={colors.primary} />,
          rightElement: <ChevronRight size={20} color={colors.textTertiary} />
        }
      ]
    }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.profileSection} activeOpacity={0.7}>
          <Avatar 
            uri={user.avatar} 
            size={60} 
            name={user.name}
            showPlaceholder={!user.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileStatus}>{user.status}</Text>
          </View>
          <ChevronRight size={24} color={colors.textTertiary} />
        </TouchableOpacity>
        
        {settingsSections.map((section) => (
          <View key={section.id} style={styles.settingsSection}>
            {section.items.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.settingsItem}
                activeOpacity={0.7}
              >
                <View style={styles.settingsItemLeft}>
                  {item.icon}
                  <Text style={styles.settingsItemTitle}>{item.title}</Text>
                </View>
                {item.rightElement}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        <View style={styles.footer}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://images.pexels.com/photos/5750700/pexels-photo-5750700.jpeg?auto=compress&cs=tinysrgb&w=150'
            }}
          />
          <Text style={styles.version}>WhatsApp Clone v1.0.0</Text>
          <Text style={styles.copyright}>Built with Expo & React Native</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primaryDark,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textOnPrimary,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    marginBottom: 20,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  profileStatus: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingsSection: {
    marginBottom: 20,
    backgroundColor: colors.background,
    borderRadius: 8,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: colors.textTertiary,
  },
});