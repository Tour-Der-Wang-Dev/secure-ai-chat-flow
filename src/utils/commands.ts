
import { AI_MODELS, COMMANDS } from '../config/constants';

/**
 * Generate help text for available commands
 */
export const generateHelpText = (): string => {
  let helpText = "Available commands:\n\n";
  
  Object.entries(COMMANDS).forEach(([cmd, info]) => {
    helpText += `/${cmd} - ${info.description}\n`;
    if (info.usage) {
      helpText += `    Usage: ${info.usage}\n`;
    }
  });
  
  return helpText;
};

/**
 * Generate text for model selection
 */
export const generateModelSelectionText = (currentModel: string): string => {
  let modelText = "Available models:\n\n";
  
  AI_MODELS.forEach(model => {
    const selected = model.id === currentModel ? "* " : "  ";
    modelText += `${selected}${model.name} (${model.id})\n`;
  });
  
  modelText += "\nTo select a model, use /model followed by the model ID";
  
  return modelText;
};

/**
 * Get a valid model from the available models list
 */
export const getValidModel = (modelId: string): string | null => {
  const model = AI_MODELS.find(m => m.id === modelId);
  return model ? model.id : null;
};

/**
 * Saves content to a file and triggers download
 */
export const saveToFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Generates a filename for chat export with current date
 */
export const generateChatExportFilename = (): string => {
  const now = new Date();
  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
  
  const timePart = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
  ].join('');
  
  return `chat-export-${datePart}-${timePart}.txt`;
};
