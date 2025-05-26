import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import colors from '@/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  theme?: 'light' | 'dark';
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  onClear,
  theme = 'light',
}: SearchBarProps) {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : colors.background }]}> 
      <View style={[styles.searchContainer, { backgroundColor: theme === 'dark' ? '#181a1b' : colors.backgroundDark }]}> 
        <Search size={20} color={theme === 'dark' ? '#aaa' : colors.textSecondary} />
        <TextInput
          style={[styles.input, { color: theme === 'dark' ? '#fff' : colors.textPrimary }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme === 'dark' ? '#888' : colors.textSecondary}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={18} color={theme === 'dark' ? '#aaa' : colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
});