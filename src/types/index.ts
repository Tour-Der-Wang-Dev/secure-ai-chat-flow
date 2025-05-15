
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  messages: Message[];
  currentPage: number;
  selectedModel: string;
  lastSaved?: Date;
}

export interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  selectedModel: string;
  error: string | null;
  isTyping: boolean;
  setCurrentPage: (page: number) => void;
  sendMessage: (content: string) => Promise<void>;
  handleCommand: (command: string) => Promise<boolean>;
  clearMessages: () => void;
  exportChatHistory: () => void;
  changeModel: (modelId: string) => void;
  regenerateLastResponse: () => Promise<void>;
  scrollHistory: (direction: "up" | "down") => void;
}

export interface OpenRouterPayload {
  model: string;
  messages: {
    role: MessageRole;
    content: string;
  }[];
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: MessageRole;
      content: string;
    };
    finish_reason: string;
  }[];
}

export interface OpenRouterError {
  error: {
    message: string;
    type: string;
  };
}
