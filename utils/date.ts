import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return format(date, 'HH:mm');
};

export const formatChatListTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'dd/MM/yyyy');
  }
};

export const formatLastSeen = (timestamp: string, isOnline: boolean): string => {
  if (isOnline) return 'online';
  return `last seen ${formatDistanceToNow(new Date(timestamp), { addSuffix: true })}`;
};