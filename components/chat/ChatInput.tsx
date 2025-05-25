import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { 
  Camera, 
  Mic, 
  Paperclip, 
  Send, 
  Smile
} from 'lucide-react-native';
import colors from '@/constants/colors';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  const showSendButton = message.trim().length > 0;
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Smile size={24} color={colors.icon} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Message"
            placeholderTextColor={colors.textTertiary}
            multiline
          />
          
          <TouchableOpacity style={styles.iconButton}>
            <Paperclip size={24} color={colors.icon} />
          </TouchableOpacity>
          
          {!showSendButton && (
            <TouchableOpacity style={styles.iconButton}>
              <Camera size={24} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!showSendButton}
        >
          {showSendButton ? (
            <Send size={20} color={colors.textOnPrimary} />
          ) : (
            <Mic size={24} color={colors.textOnPrimary} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.background,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});