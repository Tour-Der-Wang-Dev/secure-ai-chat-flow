
// API configuration
export const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
export const OPENROUTER_REFERER = "https://lovable.dev/";
export const API_TIMEOUT_MS = 30000;
export const RATE_LIMIT_PER_MINUTE = 30;

// Chat interface configuration
export const MESSAGES_PER_PAGE = 20;
export const AUTO_SAVE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
export const SESSION_STORAGE_KEY = "chat_session_data";

// Available AI models
export const AI_MODELS = [
  { id: "openai/gpt-4o", name: "GPT-4o" },
  { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku" },
  { id: "anthropic/claude-3-opus", name: "Claude 3 Opus" },
  { id: "anthropic/claude-3-sonnet", name: "Claude 3 Sonnet" },
  { id: "google/gemini-pro", name: "Gemini Pro" },
];

// Command system
export const COMMANDS = {
  help: { description: "Display available commands and usage" },
  clear: { description: "Clear chat display" },
  exit: { description: "End current session" },
  save: { description: "Export chat history to file" },
  model: { description: "Select different AI model" },
  retry: { description: "Regenerate last AI response" },
  scroll: { description: "Navigate message history", usage: "/scroll <up/down>" },
};
