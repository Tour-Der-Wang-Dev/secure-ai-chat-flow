
import React, { useEffect, useState } from 'react';

interface TypingIndicatorProps {
  isTyping: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping }) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    if (!isTyping) return;
    
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) {
          return '';
        }
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [isTyping]);
  
  if (!isTyping) return null;
  
  return (
    <div className="flex items-center space-x-2 p-3 text-green-500 animate-pulse">
      <div className="font-mono">AI is typing{dots}</div>
    </div>
  );
};

export default TypingIndicator;
