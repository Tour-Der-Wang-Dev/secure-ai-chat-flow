
import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { AI_MODELS } from '../config/constants';

const ModelSelector: React.FC = () => {
  const { selectedModel, changeModel } = useChatContext();
  
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeModel(e.target.value);
  };
  
  return (
    <div className="flex items-center p-3 border-b border-gray-200">
      <label htmlFor="model-select" className="mr-2 text-sm font-medium">
        AI Model:
      </label>
      <select
        id="model-select"
        className="rounded border border-gray-300 p-1 text-sm"
        value={selectedModel}
        onChange={handleModelChange}
      >
        {AI_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
