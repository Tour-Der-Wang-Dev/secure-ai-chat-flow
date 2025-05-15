
import React, { useEffect, useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import MessageList from './MessageList';
import InputArea from './InputArea';
import ModelSelector from './ModelSelector';
import { testApiConnection } from '../services/openRouterApi';
import CommandPalette from './CommandPalette';
import { Button } from './ui/button';
import { CommandIcon } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const { error } = useChatContext();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const checkApiConnection = async () => {
      const isConnected = await testApiConnection();
      if (!isConnected) {
        console.error('OpenRouter API key is not configured properly');
      }
    };
    
    checkApiConnection();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Secure Chat Interface</h1>
          <p className="text-sm opacity-75">
            Type /help to see available commands
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-blue-500"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <CommandIcon className="w-5 h-5 mr-2" />
          Commands
        </Button>
      </header>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <ModelSelector />
      
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>
      
      <InputArea />

      <CommandPalette 
        open={commandPaletteOpen} 
        onOpenChange={setCommandPaletteOpen} 
      />
    </div>
  );
};

export default ChatInterface;
