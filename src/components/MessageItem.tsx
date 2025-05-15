
import React from 'react';
import { Message } from '../types';
import { formatTimestamp } from '../utils/validators';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const getRoleClass = (role: string) => {
    switch (role) {
      case 'user':
        return 'bg-blue-100 text-blue-800';
      case 'assistant':
        return 'bg-green-100 text-green-800';
      case 'system':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'user':
        return 'User';
      case 'assistant':
        return 'AI';
      case 'system':
        return 'System';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <div className={`p-4 rounded-lg mb-3 shadow-sm ${getRoleClass(message.role)}`}>
      <div className="font-mono text-sm mb-1">
        [{formatTimestamp(message.timestamp)}] {getRoleLabel(message.role)}&gt;
      </div>
      <div className="whitespace-pre-wrap">{message.content}</div>
    </div>
  );
};

export default MessageItem;
