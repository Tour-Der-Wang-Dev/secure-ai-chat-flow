
import React, { useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import { AI_MODELS } from '../config/constants';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const ModelSelector: React.FC = () => {
  const { selectedModel, changeModel } = useChatContext();
  const selectRef = useRef<HTMLButtonElement>(null);
  
  const handleModelChange = (value: string) => {
    changeModel(value);
  };
  
  return (
    <div className="flex items-center p-3 border-b border-gray-200">
      <label htmlFor="model-select" className="mr-2 text-sm font-medium">
        AI Model:
      </label>
      <Select value={selectedModel} onValueChange={handleModelChange}>
        <SelectTrigger 
          id="model-select"
          ref={selectRef} 
          className="w-[200px] text-sm"
        >
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>AI Models</SelectLabel>
            {AI_MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
