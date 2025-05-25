import { User, Chat, Message, CallHistory, StatusUpdate } from '@/types';
import { formatDistanceToNow } from 'date-fns';

const getRandomTime = (hoursAgo: number = 24) => {
  const date = new Date();
  date.setHours(date.getHours() - Math.floor(Math.random() * hoursAgo));
  return date.toISOString();
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'Hey there! I am using WhatsApp',
    lastSeen: getRandomTime(1),
    phone: '+1 (555) 123-4567',
    isOnline: true
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'At work',
    lastSeen: getRandomTime(3),
    phone: '+1 (555) 987-6543',
    isOnline: false
  },
  {
    id: '3',
    name: 'Carlos Rodriguez',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'Busy',
    lastSeen: getRandomTime(12),
    phone: '+1 (555) 444-3333',
    isOnline: false
  },
  {
    id: '4',
    name: 'Diana Chen',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'Available',
    lastSeen: getRandomTime(0.5),
    phone: '+1 (555) 222-1111',
    isOnline: true
  },
  {
    id: '5',
    name: 'Eva Williams',
    avatar: 'https://images.pexels.com/photos/3781543/pexels-photo-3781543.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'At the movies',
    lastSeen: getRandomTime(5),
    phone: '+1 (555) 777-8888',
    isOnline: false
  },
  {
    id: '6',
    name: 'Frank Thomas',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'Battery about to die',
    lastSeen: getRandomTime(0.1),
    phone: '+1 (555) 999-0000',
    isOnline: true
  },
  {
    id: '7',
    name: 'Work Group',
    avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'Group for work discussions',
    lastSeen: getRandomTime(1),
    phone: '',
    isOnline: false
  },
  {
    id: '8',
    name: 'Family',
    avatar: 'https://images.pexels.com/photos/3811993/pexels-photo-3811993.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'Family group chat',
    lastSeen: getRandomTime(2),
    phone: '',
    isOnline: false
  }
];

const generateMessages = (chatId: string, count: number = 10): Message[] => {
  const messages: Message[] = [];
  const statuses: ('sent' | 'delivered' | 'read')[] = ['sent', 'delivered', 'read'];
  
  for (let i = 0; i < count; i++) {
    const isMe = Math.random() > 0.5;
    const timestamp = getRandomTime(24);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    messages.push({
      id: `${chatId}-msg-${i}`,
      text: getRandomMessage(),
      timestamp,
      sender: isMe ? 'me' : chatId,
      status: isMe ? status : 'read',
      isMe
    });
  }
  
  // Sort messages by timestamp
  return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

const getRandomMessage = (): string => {
  const messages = [
    'Hey there!',
    'How are you doing?',
    'Can we meet tomorrow?',
    "I'm running late, sorry!",
    'Did you see the news?',
    'What time is the meeting?',
    'That sounds good to me',
    "I'll be there in 10 minutes",
    'Have you finished the report?',
    'Let\'s grab coffee sometime',
    'Thanks for your help!',
    'No problem, happy to help',
    'Are you free this weekend?',
    'The weather is beautiful today',
    'Did you watch the game last night?'
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export const mockChats: Chat[] = [
  {
    id: '1',
    type: 'individual',
    participants: [mockUsers[0]],
    messages: generateMessages('1', 15),
    unreadCount: 2,
  },
  {
    id: '2',
    type: 'individual',
    participants: [mockUsers[1]],
    messages: generateMessages('2', 8),
    unreadCount: 0,
  },
  {
    id: '3',
    type: 'individual',
    participants: [mockUsers[2]],
    messages: generateMessages('3', 12),
    unreadCount: 5,
  },
  {
    id: '4',
    type: 'individual',
    participants: [mockUsers[3]],
    messages: generateMessages('4', 20),
    unreadCount: 0,
  },
  {
    id: '5',
    type: 'individual',
    participants: [mockUsers[4]],
    messages: generateMessages('5', 5),
    unreadCount: 1,
  },
  {
    id: '6',
    type: 'group',
    name: 'Work Group',
    avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=256',
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
    messages: generateMessages('6', 25),
    unreadCount: 10,
  },
  {
    id: '7',
    type: 'group',
    name: 'Family',
    avatar: 'https://images.pexels.com/photos/3811993/pexels-photo-3811993.jpeg?auto=compress&cs=tinysrgb&w=256',
    participants: [mockUsers[0], mockUsers[4], mockUsers[5]],
    messages: generateMessages('7', 18),
    unreadCount: 3,
  }
];

// Update chats with lastMessage
export const populatedMockChats = mockChats.map(chat => {
  const messages = chat.messages;
  return {
    ...chat,
    lastMessage: messages[messages.length - 1],
  };
});

export const mockCalls: CallHistory[] = [
  {
    id: '1',
    user: mockUsers[0],
    timestamp: getRandomTime(2),
    duration: '5:23',
    type: 'audio',
    status: 'outgoing'
  },
  {
    id: '2',
    user: mockUsers[1],
    timestamp: getRandomTime(8),
    duration: null,
    type: 'video',
    status: 'missed'
  },
  {
    id: '3',
    user: mockUsers[2],
    timestamp: getRandomTime(12),
    duration: '1:05',
    type: 'audio',
    status: 'incoming'
  },
  {
    id: '4',
    user: mockUsers[3],
    timestamp: getRandomTime(1),
    duration: '15:47',
    type: 'video',
    status: 'outgoing'
  },
  {
    id: '5',
    user: mockUsers[0],
    timestamp: getRandomTime(5),
    duration: null,
    type: 'audio',
    status: 'missed'
  }
];

export const mockStatusUpdates: StatusUpdate[] = [
  {
    id: '1',
    user: mockUsers[0],
    timestamp: getRandomTime(5),
    content: {
      type: 'image',
      media: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=650',
      text: 'Enjoying my vacation!'
    },
    seenBy: ['2', '3'],
    expiresAt: getRandomTime(-19) // Expires in 24 hours from creation
  },
  {
    id: '2',
    user: mockUsers[1],
    timestamp: getRandomTime(10),
    content: {
      type: 'text',
      text: 'Just finished a great book!',
      backgroundColor: '#128C7E'
    },
    seenBy: ['1'],
    expiresAt: getRandomTime(-14)
  },
  {
    id: '3',
    user: mockUsers[2],
    timestamp: getRandomTime(2),
    content: {
      type: 'image',
      media: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=650',
      text: 'New recipe I tried today'
    },
    seenBy: [],
    expiresAt: getRandomTime(-22)
  },
  {
    id: '4',
    user: mockUsers[4],
    timestamp: getRandomTime(1),
    content: {
      type: 'text',
      text: 'Hard at work!',
      backgroundColor: '#075E54'
    },
    seenBy: ['1', '2', '3'],
    expiresAt: getRandomTime(-23)
  }
];

export const getCurrentUser = (): User => {
  return {
    id: 'me',
    name: 'You',
    avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=256',
    status: 'Available',
    lastSeen: new Date().toISOString(),
    phone: '+1 (555) 555-5555',
    isOnline: true
  };
};

// Format the lastSeen property for all users
export const formatLastSeen = (user: User): string => {
  if (user.isOnline) return 'online';
  return formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true });
};