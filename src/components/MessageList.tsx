
import React, { useRef, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import { MESSAGES_PER_PAGE } from '../config/constants';

const MessageList: React.FC = () => {
  const { 
    messages, 
    isTyping, 
    currentPage, 
    totalPages,
    setCurrentPage 
  } = useChatContext();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change or typing status changes
  useEffect(() => {
    if (currentPage === totalPages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, currentPage, totalPages]);
  
  // Calculate which messages to show based on pagination
  const startIdx = (currentPage - 1) * MESSAGES_PER_PAGE;
  const endIdx = startIdx + MESSAGES_PER_PAGE;
  const displayedMessages = messages.slice(startIdx, endIdx);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {displayedMessages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <TypingIndicator isTyping={isTyping} />
        <div ref={messagesEndRef} />
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center p-2 border-t border-gray-200">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 mr-2"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 ml-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageList;
