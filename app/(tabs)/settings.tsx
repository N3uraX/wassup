import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Image,
  Modal,
  TextInput
} from 'react-native';
import { ChevronRight, Key, BellRing, MessageSquare, Database, CircleHelp as HelpCircle, Users, Moon, Camera } from 'lucide-react-native';
import Avatar from '@/components/common/Avatar';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import colors from '@/constants/colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { user, updateProfile } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [darkMode, setDarkMode] = React.useState(false);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [about, setAbout] = useState(user?.status || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [lastSeenVisible, setLastSeenVisible] = useState(true);
  const [profilePhotoVisible, setProfilePhotoVisible] = useState(true);
  const insets = useSafeAreaInsets();

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
  
  const handleSave = () => {
    updateProfile({ name, status: about, avatar, phone });
    setEditModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : colors.background }} edges={['top', 'left', 'right']}>
      <View style={[styles.headerRow, { paddingTop: insets.top + 8, backgroundColor: theme === 'dark' ? '#000' : colors.background }]}> 
        <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>Settings</Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : colors.background }} contentContainerStyle={{ paddingBottom: 32 }}>
        <TouchableOpacity style={[styles.profileSection, { backgroundColor: theme === 'dark' ? '#181a1b' : colors.background }]} activeOpacity={0.7} onPress={() => setEditModal(true)}>
          <Avatar 
            uri={user.avatar} 
            size={60} 
            name={user.name}
            showPlaceholder={!user.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>{user.name}</Text>
            <Text style={[styles.profileStatus, { color: theme === 'dark' ? '#aaa' : colors.textSecondary }]}>{user.status}</Text>
            <Text style={[styles.profilePhone, { color: theme === 'dark' ? '#888' : colors.textTertiary }]}>{user.phone}</Text>
          </View>
          <ChevronRight size={24} color={theme === 'dark' ? '#888' : colors.textTertiary} />
        </TouchableOpacity>
        
        {settingsSections.map(section => (
          <View key={section.id} style={[styles.section, { backgroundColor: theme === 'dark' ? '#000' : colors.background, borderColor: theme === 'dark' ? '#222' : '#e0e0e0' }]}> 
            {section.items.map(item => (
              <View key={item.id} style={styles.row}>
                <View style={styles.icon}>{item.icon}</View>
                <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>{item.title}</Text>
                <View style={styles.right}>{item.rightElement}</View>
              </View>
            ))}
            {section.id === 'account' && (
              <View style={styles.row}>
                <View style={styles.icon}><Moon size={22} color={colors.primary} /></View>
                <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}>Dark Mode</Text>
                <View style={styles.right}>
                  <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
                </View>
              </View>
            )}
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

      <Modal visible={editModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity style={styles.avatarEdit} onPress={() => setAvatar('https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=256')}>
              <Avatar uri={avatar} size={72} name={name} />
              <View style={styles.cameraIcon}><Camera size={22} color="#fff" /></View>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={about}
              onChangeText={setAbout}
              placeholder="About"
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPrivacy(true)} style={{ marginTop: 16 }}>
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Privacy Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Privacy Settings Modal */}
      <Modal visible={showPrivacy} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Privacy Settings</Text>
            <View style={styles.privacyRow}>
              <Text style={styles.privacyLabel}>Show Last Seen</Text>
              <Switch value={lastSeenVisible} onValueChange={setLastSeenVisible} />
            </View>
            <View style={styles.privacyRow}>
              <Text style={styles.privacyLabel}>Show Profile Photo</Text>
              <Switch value={profilePhotoVisible} onValueChange={setProfilePhotoVisible} />
            </View>
            <TouchableOpacity onPress={() => setShowPrivacy(false)}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    // backgroundColor: colors.background, // Removed hardcoded backgroundColor
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  container: { flex: 1 },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: colors.background, // Removed hardcoded backgroundColor
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
  profilePhone: {
    fontSize: 14,
    color: colors.textTertiary,
    marginTop: 2,
  },
  section: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent', // Always transparent, color set inline
    borderColor: 'transparent', // Always transparent, color set inline
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', // Always transparent, color set inline
    backgroundColor: 'transparent',
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222d34',
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '500',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  avatarEdit: { marginBottom: 16, position: 'relative' },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 4,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelText: { color: colors.primary, marginTop: 8 },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  privacyLabel: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});