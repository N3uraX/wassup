import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, Modal } from 'react-native';
import { useStatusStore } from '@/store/useStatusStore';
import { getCurrentUser } from '@/assets/data/mockData';
import { Camera } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';

export default function MyStatusScreen() {
  const { statusUpdates, addStatus } = useStatusStore();
  const { theme } = useThemeStore();
  const currentUser = getCurrentUser();
  const myStatuses = statusUpdates.filter(s => s.user.id === currentUser.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handlePost = () => {
    if (text.trim() || image) {
      addStatus({
        type: image ? 'image' : 'text',
        text: text.trim(),
        media: image || undefined,
      });
      setText('');
      setImage(null);
      setModalVisible(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <Text style={styles.title}>My Status</Text>
      <TouchableOpacity style={styles.addStatus} onPress={() => setModalVisible(true)}>
        <Camera size={28} color="#888" />
        <Text style={styles.addStatusText}>Add Status</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Your Status Updates</Text>
      <FlatList
        data={myStatuses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.statusItem, { backgroundColor: theme === 'dark' ? '#111' : '#f2f2f2' }]}>
            {item.content.media && (
              <Image source={{ uri: item.content.media }} style={styles.statusImage} />
            )}
            <Text style={styles.statusText}>{item.content.text}</Text>
            <Text style={styles.statusTime}>{new Date(item.timestamp).toLocaleString()}</Text>
            <TouchableOpacity style={styles.viewersButton} onPress={() => alert('Seen by: ' + (item.seenBy?.length || 0))}>
              <Text style={styles.viewersText}>Seen by {item.seenBy?.length || 0}</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No status updates yet.</Text>}
      />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme === 'dark' ? '#111' : '#fff' }]}>
            <Text style={styles.modalTitle}>Post New Status</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000', borderColor: theme === 'dark' ? '#333' : '#ddd' },
              ]}
              placeholder="What's on your mind?"
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity style={[
              styles.imagePicker,
              { backgroundColor: theme === 'dark' ? '#222' : '#eee' },
            ]} onPress={() => setImage('https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=650')}>
              {image ? (
                <Image source={{ uri: image }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.imagePickerText}>Pick an image (mock)</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  addStatus: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  addStatusText: { marginLeft: 8, color: '#888', fontSize: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  statusItem: { padding: 16, borderRadius: 8, marginBottom: 12 },
  statusImage: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8 },
  statusText: { fontSize: 16, marginBottom: 4 },
  statusTime: { color: '#888', fontSize: 12, marginBottom: 4 },
  viewersButton: { alignSelf: 'flex-end', marginTop: 4 },
  viewersText: { color: '#25D366', fontSize: 13 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 24 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { padding: 24, borderRadius: 12, width: '85%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 12 },
  imagePicker: { width: '100%', height: 120, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  imagePickerText: { color: '#888' },
  imagePreview: { width: '100%', height: 120, borderRadius: 8 },
  postButton: { backgroundColor: '#25D366', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginBottom: 8 },
  postButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelText: { color: '#25D366', marginTop: 8 },
});
