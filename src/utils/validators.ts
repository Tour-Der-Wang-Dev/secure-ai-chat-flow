
import DOMPurify from 'dompurify';

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return DOMPurify.sanitize(input.trim());
};

/**
 * Validates if a string is a valid command
 */
export const isCommand = (input: string): boolean => {
  return input.trim().startsWith('/');
};

/**
 * Extracts command and arguments from a command string
 */
export const parseCommand = (input: string): { command: string, args: string[] } => {
  const trimmed = input.trim().substring(1); // Remove the leading slash
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
};

/**
 * Format timestamp in [HH:MM:SS] format
 */
export const formatTimestamp = (date: Date): string => {
  return [
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0')
  ].join(':');
};
