import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatContextType, Message, ChatSession } from '../types';
import { AI_MODELS, AUTO_SAVE_INTERVAL_MS, MESSAGES_PER_PAGE, SESSION_STORAGE_KEY } from '../config/constants';
import { sendChatRequest } from '../services/openRouterApi';
import { sanitizeInput, parseCommand, isCommand } from '../utils/validators';
import { generateHelpText, generateModelSelectionText, getValidModel, saveToFile, generateChatExportFilename } from '../utils/commands';

// Create context with default values
const ChatContext = createContext<ChatContextType>({
  messages: [],
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  selectedModel: AI_MODELS[0].id,
  error: null,
  isTyping: false,
  setCurrentPage: () => {},
  sendMessage: async () => {},
  handleCommand: async () => false,
  clearMessages: () => {},
  exportChatHistory: () => {},
  changeModel: () => {},
  regenerateLastResponse: async () => {},
  scrollHistory: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs to keep track of autoSave interval
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(messages.length / MESSAGES_PER_PAGE));
  
  // Add system initialization message
  useEffect(() => {
    if (messages.length === 0) {
      const initMessage: Message = {
        id: uuidv4(),
        role: 'system',
        content: 'Welcome to the secure chat interface. Type a message to start or /help for available commands.',
        timestamp: new Date(),
      };
      setMessages([initMessage]);
    }
  }, []);

  // Load session from storage
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
      if (savedSession) {
        const session: ChatSession = JSON.parse(savedSession);
        setMessages(session.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
        setCurrentPage(session.currentPage);
        setSelectedModel(session.selectedModel || AI_MODELS[0].id);
      }
    } catch (err) {
      console.error('Failed to load session:', err);
      addSystemMessage('Failed to load previous session. Starting a new session.');
    }
  }, []);

  // Set up auto-save
  useEffect(() => {
    if (autoSaveIntervalRef.current) {
      clearInterval(autoSaveIntervalRef.current);
    }
    
    autoSaveIntervalRef.current = setInterval(() => {
      saveSession();
    }, AUTO_SAVE_INTERVAL_MS);
    
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [messages, currentPage, selectedModel]);

  // Save session to local storage
  const saveSession = useCallback(() => {
    try {
      const session: ChatSession = {
        messages,
        currentPage,
        selectedModel,
        lastSaved: new Date(),
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      addSystemMessage('Chat session auto-saved.');
    } catch (err) {
      console.error('Failed to save session:', err);
    }
  }, [messages, currentPage, selectedModel]);

  // Helper to add a system message
  const addSystemMessage = (content: string) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: uuidv4(),
        role: 'system',
        content,
        timestamp: new Date(),
      }
    ]);
  };

  // Send a message to the AI
  const sendMessage = async (content: string) => {
    // Don't process empty messages
    if (!content.trim()) return;
    
    try {
      // Check if this is a command
      if (isCommand(content)) {
        const handled = await handleCommand(content);
        if (handled) return;
      }
      
      // Sanitize input
      const sanitizedContent = sanitizeInput(content);
      
      // Add user message
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: sanitizedContent,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setIsLoading(true);
      setIsTyping(true);
      setError(null);
      
      // Always scroll to the latest page when sending a new message
      setCurrentPage(Math.ceil((messages.length + 1) / MESSAGES_PER_PAGE));
      
      // Get recent conversation history
      const recentMessages = messages
        .filter(msg => msg.role !== 'system')
        .slice(-10)
        .map(msg => ({ role: msg.role, content: msg.content }));
      
      // Add the new message
      recentMessages.push({ role: userMessage.role, content: userMessage.content });
      
      try {
        // Send request to the OpenRouter API
        const response = await sendChatRequest({
          model: selectedModel,
          messages: recentMessages,
        });
        
        // Add AI response
        const aiMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };
        
        setMessages(prevMessages => [...prevMessages, aiMessage]);
        
        // Update current page to show the latest message
        setCurrentPage(Math.ceil((messages.length + 2) / MESSAGES_PER_PAGE));
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        addSystemMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Handle commands
  const handleCommand = async (commandStr: string): Promise<boolean> => {
    const { command, args } = parseCommand(commandStr);
    
    switch (command) {
      case 'help':
        addSystemMessage(generateHelpText());
        return true;
        
      case 'clear':
        clearMessages();
        return true;
        
      case 'exit':
        addSystemMessage('Ending session. Thank you for using the secure chat interface.');
        // Could redirect or perform additional cleanup here
        return true;
        
      case 'save':
        exportChatHistory();
        return true;
        
      case 'model':
        if (args.length > 0) {
          const modelId = args[0];
          const validModel = getValidModel(modelId);
          if (validModel) {
            changeModel(validModel);
            addSystemMessage(`Model changed to ${validModel}`);
          } else {
            addSystemMessage(`Invalid model ID: ${modelId}. Use /model to see available models.`);
            addSystemMessage(generateModelSelectionText(selectedModel));
          }
        } else {
          addSystemMessage(generateModelSelectionText(selectedModel));
        }
        return true;
        
      case 'retry':
        await regenerateLastResponse();
        return true;
        
      case 'scroll':
        if (args.length > 0) {
          const direction = args[0].toLowerCase() as 'up' | 'down';
          if (direction === 'up' || direction === 'down') {
            scrollHistory(direction);
            return true;
          }
        }
        addSystemMessage('Usage: /scroll <up/down>');
        return true;
        
      default:
        addSystemMessage(`Unknown command: /${command}. Type /help for available commands.`);
        return true;
    }
  };

  // Clear all messages except a welcome message
  const clearMessages = () => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      role: 'system',
      content: 'Chat cleared. Type a message to start or /help for available commands.',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setCurrentPage(1);
  };

  // Export chat history to a file
  const exportChatHistory = () => {
    try {
      let exportContent = "# Chat History Export\n";
      exportContent += `# Generated: ${new Date().toISOString()}\n\n`;
      
      messages.forEach(msg => {
        const time = msg.timestamp.toLocaleTimeString();
        const role = msg.role.charAt(0).toUpperCase() + msg.role.slice(1);
        exportContent += `[${time}] ${role}> ${msg.content}\n\n`;
      });
      
      const filename = generateChatExportFilename();
      saveToFile(exportContent, filename);
      
      addSystemMessage(`Chat history exported to ${filename}`);
    } catch (err) {
      console.error('Failed to export chat history:', err);
      setError('Failed to export chat history');
      addSystemMessage('Failed to export chat history. Please try again.');
    }
  };

  // Change the AI model
  const changeModel = (modelId: string) => {
    const validModel = getValidModel(modelId);
    if (validModel) {
      setSelectedModel(validModel);
    }
  };

  // Regenerate the last AI response
  const regenerateLastResponse = async () => {
    // Find the last user message and AI response pair
    let userMessageIndex = -1;
    
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        userMessageIndex = i;
        break;
      }
    }
    
    if (userMessageIndex === -1) {
      addSystemMessage('No previous message found to regenerate.');
      return;
    }
    
    // Get the user message
    const userMessage = messages[userMessageIndex];
    
    // Remove messages after the user message
    const newMessages = messages.slice(0, userMessageIndex + 1);
    setMessages(newMessages);
    
    // Send the user message again to regenerate the response
    await sendMessage(userMessage.content);
  };

  // Navigate message history
  const scrollHistory = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setCurrentPage(prev => Math.max(1, prev - 1));
    } else {
      setCurrentPage(prev => Math.min(totalPages, prev + 1));
    }
    
    addSystemMessage(`Scrolled ${direction} to page ${direction === 'up' ? 
      Math.max(1, currentPage - 1) : 
      Math.min(totalPages, currentPage + 1)} of ${totalPages}`);
  };

  // Context value
  const contextValue: ChatContextType = {
    messages,
    isLoading,
    currentPage,
    totalPages,
    selectedModel,
    error,
    isTyping,
    setCurrentPage,
    sendMessage,
    handleCommand,
    clearMessages,
    exportChatHistory,
    changeModel,
    regenerateLastResponse,
    scrollHistory,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};
