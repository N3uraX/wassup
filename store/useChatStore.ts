import { create } from 'zustand';
import { Chat, Message } from '@/types';
import { populatedMockChats, mockUsers } from '@/assets/data/mockData';

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
  error: string | null;
  
  fetchChats: () => Promise<void>;
  setActiveChat: (chatId: string) => void;
  sendMessage: (chatId: string, text: string, media?: string | null) => void;
  markAsRead: (chatId: string) => void;
  addChat: (userIds: string[], isGroup?: boolean, groupName?: string) => void;
  archiveChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  toggleRead: (chatId: string) => void;
  unarchiveChat: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: populatedMockChats,
  activeChat: null,
  isLoading: false,
  error: null,
  
  fetchChats: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        chats: populatedMockChats,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false
      });
    }
  },
  
  setActiveChat: (chatId: string) => {
    const { chats } = get();
    const chat = chats.find(c => c.id === chatId) || null;
    set({ activeChat: chat });
    
    // Mark as read when opened
    if (chat) {
      get().markAsRead(chatId);
    }
  },
  
  sendMessage: (chatId: string, text: string, media?: string | null) => {
    const timestamp = new Date().toISOString();
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      timestamp,
      sender: 'me',
      status: 'sent',
      isMe: true,
      media: media ? [{ type: 'image', url: media }] : undefined,
    };
    
    set(state => ({
      chats: state.chats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, newMessage];
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: newMessage
          };
        }
        return chat;
      }),
      activeChat: state.activeChat?.id === chatId
        ? { ...state.activeChat, messages: [...state.activeChat.messages, newMessage], lastMessage: newMessage }
        : state.activeChat
    }));
    
    // Simulate message status updates
    setTimeout(() => {
      set(state => ({
        chats: state.chats.map(chat => {
          if (chat.id === chatId) {
            const updatedMessages = chat.messages.map(msg => {
              if (msg.id === newMessage.id) {
                return { ...msg, status: 'delivered' as const };
              }
              return msg;
            });
            
            const lastMessage = { ...newMessage, status: 'delivered' as const };
            
            return {
              ...chat,
              messages: updatedMessages,
              lastMessage
            };
          }
          return chat;
        }),
        activeChat: state.activeChat?.id === chatId
          ? {
              ...state.activeChat,
              messages: state.activeChat.messages.map(msg => {
                if (msg.id === newMessage.id) {
                  return { ...msg, status: 'delivered' as const };
                }
                return msg;
              }),
              lastMessage: { ...newMessage, status: 'delivered' as const }
            }
          : state.activeChat
      }));
    }, 1000);
    
    setTimeout(() => {
      set(state => ({
        chats: state.chats.map(chat => {
          if (chat.id === chatId) {
            const updatedMessages = chat.messages.map(msg => {
              if (msg.id === newMessage.id) {
                return { ...msg, status: 'read' as const };
              }
              return msg;
            });
            
            const lastMessage = { ...newMessage, status: 'read' as const };
            
            return {
              ...chat,
              messages: updatedMessages,
              lastMessage
            };
          }
          return chat;
        }),
        activeChat: state.activeChat?.id === chatId
          ? {
              ...state.activeChat,
              messages: state.activeChat.messages.map(msg => {
                if (msg.id === newMessage.id) {
                  return { ...msg, status: 'read' as const };
                }
                return msg;
              }),
              lastMessage: { ...newMessage, status: 'read' as const }
            }
          : state.activeChat
      }));
    }, 2000);
  },
  
  markAsRead: (chatId: string) => {
    set(state => ({
      chats: state.chats.map(chat => {
        if (chat.id === chatId) {
          return { ...chat, unreadCount: 0 };
        }
        return chat;
      })
    }));
  },
  
  addChat: (userIds: string[], isGroup = false, groupName?: string) => {
    set(state => {
      // Check if chat already exists (for individual chats)
      if (!isGroup && userIds.length === 1) {
        const existing = state.chats.find(
          c => c.type === 'individual' && c.participants[0]?.id === userIds[0]
        );
        if (existing) return { ...state, activeChat: existing };
      }
      // Create new chat
      const participants = mockUsers.filter(u => userIds.includes(u.id));
      const newChat: Chat = {
        id: Date.now().toString(),
        type: isGroup ? 'group' : 'individual',
        participants,
        messages: [],
        unreadCount: 0,
        name: isGroup ? groupName : undefined,
        avatar: isGroup ? undefined : undefined,
        isFavorite: false,
        isArchived: false,
      };
      return {
        ...state,
        chats: [...state.chats, newChat],
        activeChat: newChat,
      };
    });
  },
  archiveChat: (chatId: string) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId ? { ...chat, isArchived: true } : chat
      ),
    }));
  },
  deleteChat: (chatId: string) => {
    set(state => ({
      chats: state.chats.filter(chat => chat.id !== chatId),
    }));
  },
  toggleRead: (chatId: string) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId
          ? { ...chat, unreadCount: chat.unreadCount > 0 ? 0 : 1 }
          : chat
      ),
    }));
  },
  unarchiveChat: (chatId: string) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId ? { ...chat, isArchived: false } : chat
      ),
    }));
  },
}));