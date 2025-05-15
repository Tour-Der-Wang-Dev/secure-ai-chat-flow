
import { OPENROUTER_API_URL, OPENROUTER_REFERER, API_TIMEOUT_MS } from '../config/constants';
import { OpenRouterPayload, OpenRouterResponse, OpenRouterError } from '../types';

let requestCount = 0;
let requestCountResetTimeout: NodeJS.Timeout | null = null;

/**
 * Enforces rate limiting for API calls
 * @throws {Error} When rate limit is exceeded
 */
const enforceRateLimit = (limit: number): void => {
  if (requestCount === 0) {
    // Set up automatic reset of request count after 1 minute
    if (requestCountResetTimeout) {
      clearTimeout(requestCountResetTimeout);
    }
    requestCountResetTimeout = setTimeout(() => {
      requestCount = 0;
    }, 60000); // Reset after 1 minute
  }

  if (requestCount >= limit) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  requestCount++;
};

/**
 * Creates a promise that rejects after specified timeout
 */
const createTimeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
};

/**
 * Sends a request to the OpenRouter API with rate limiting and timeout
 */
export const sendChatRequest = async (payload: OpenRouterPayload): Promise<string> => {
  try {
    // Check and enforce rate limit
    enforceRateLimit(30);
    
    // Create API request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
    
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenRouter API key is not configured');
    }
    
    // Race the fetch with a timeout promise
    const response = await Promise.race([
      fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': OPENROUTER_REFERER,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }),
      createTimeoutPromise(API_TIMEOUT_MS),
    ]);
    
    clearTimeout(timeoutId);
    
    // Parse response
    const data = await response.json() as OpenRouterResponse | OpenRouterError;

    if ('error' in data) {
      throw new Error(`API Error: ${data.error.message}`);
    }

    // Extract text from the first choice
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No response content received from API');
    }
    
  } catch (error) {
    if (error instanceof Error) {
      // Log error for debugging
      console.error('OpenRouter API Error:', error.message);
      throw new Error(`Failed to get response: ${error.message}`);
    }
    throw new Error('Unknown error occurred while contacting the API');
  }
};

/**
 * Simple check to test if API is accessible
 */
export const testApiConnection = async (): Promise<boolean> => {
  try {
    // API key validation
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey.length < 10) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};
