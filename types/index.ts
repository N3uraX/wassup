export interface User {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastSeen: string;
  phone: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  status: 'sent' | 'delivered' | 'read';
  isMe: boolean;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  }[];
}

export interface Chat {
  id: string;
  type: 'individual' | 'group';
  participants: User[];
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
  name?: string; // for group chats
  avatar?: string; // for group chats
}

export interface CallHistory {
  id: string;
  user: User;
  timestamp: string;
  duration: string | null; // null for missed calls
  type: 'audio' | 'video';
  status: 'incoming' | 'outgoing' | 'missed';
}

export interface StatusUpdate {
  id: string;
  user: User;
  timestamp: string;
  content: {
    type: 'image' | 'text' | 'video';
    media?: string;
    text?: string;
    backgroundColor?: string;
  };
  seenBy: string[]; // array of user IDs
  expiresAt: string;
}