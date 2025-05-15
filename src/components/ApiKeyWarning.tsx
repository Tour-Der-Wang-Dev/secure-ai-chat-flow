
import React from 'react';

const ApiKeyWarning: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-amber-500 text-6xl flex justify-center mb-4">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">API Key Required</h1>
        <div className="space-y-4">
          <p>
            To use this chat interface, you need to set up your OpenRouter API key.
          </p>
          
          <div className="bg-gray-100 p-4 rounded text-sm font-mono">
            <p className="mb-2 font-bold">Create a .env file with:</p>
            <code className="text-green-600">VITE_OPENROUTER_API_KEY=your_api_key_here</code>
          </div>
          
          <div className="flex justify-center">
            <a 
              href="https://openrouter.ai/keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Get an API key
            </a>
          </div>
          
          <div className="text-sm text-gray-600 border-t pt-4 mt-4">
            <p className="mb-2">
              <strong>Security note:</strong> Your API key is stored only in your .env file and is not shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyWarning;
