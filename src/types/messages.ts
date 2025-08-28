export interface MessagePeer {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface MessageItem {
  id: string;
  from: MessagePeer;
  preview: string;
  createdAt: string;
  read: boolean;
  threadId?: string;
}

export const countUnreadMessages = (items: MessageItem[]) =>
  items.reduce((acc, it) => acc + (it.read ? 0 : 1), 0);