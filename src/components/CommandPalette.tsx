
import React, { useEffect, useState } from 'react';
import { Command } from '@/components/ui/command';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useChatContext } from '../context/ChatContext';
import {
  HelpCircle,
  Trash2,
  LogOut,
  RefreshCw,
  Download,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AI_MODELS } from '../config/constants';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const {
    clearMessages,
    exportChatHistory,
    scrollHistory,
    selectedModel,
    changeModel,
    regenerateLastResponse,
    handleCommand,
  } = useChatContext();

  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [exportFormat, setExportFormat] = useState<string>("txt");

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier) {
        switch (e.key.toLowerCase()) {
          case 'h': // Help
            e.preventDefault();
            onOpenChange(true);
            break;
          case 'l': // Clear Chat
            e.preventDefault();
            setShowClearConfirmation(true);
            break;
          case 'q': // Exit Session
            e.preventDefault();
            setShowExitConfirmation(true);
            break;
          case 'm': // Change Model
            e.preventDefault();
            onOpenChange(true);
            break;
          case 'r': // Retry Response
            e.preventDefault();
            regenerateLastResponse();
            toast({
              title: "Regenerating response",
              description: "The AI is generating a new response.",
            });
            break;
          case 's': // Save Chat
            e.preventDefault();
            exportChatHistory();
            break;
          case 'arrowup': // Scroll Up
            e.preventDefault();
            scrollHistory('up');
            break;
          case 'arrowdown': // Scroll Down
            e.preventDefault();
            scrollHistory('down');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.addEventListener('keydown', handleKeyDown);
    };
  }, [onOpenChange, clearMessages, exportChatHistory, scrollHistory, regenerateLastResponse]);

  const handleHelp = () => {
    handleCommand('/help');
    onOpenChange(false);
  };

  const handleClearChat = () => {
    setShowClearConfirmation(false);
    clearMessages();
    onOpenChange(false);
    toast({
      title: "Chat cleared",
      description: "All messages have been deleted.",
    });
  };

  const handleExitSession = () => {
    setShowExitConfirmation(false);
    handleCommand('/exit');
    onOpenChange(false);
    toast({
      title: "Session ended",
      description: "You've been returned to the welcome screen.",
    });
  };

  const handleModelChange = (modelId: string) => {
    changeModel(modelId);
    toast({
      title: "Model changed",
      description: `Now using ${AI_MODELS.find(m => m.id === modelId)?.name}`,
    });
    onOpenChange(false);
  };

  const handleRetryResponse = () => {
    regenerateLastResponse();
    onOpenChange(false);
    toast({
      title: "Regenerating response",
      description: "The AI is generating a new response.",
    });
  };

  const handleSaveChat = () => {
    exportChatHistory();
    onOpenChange(false);
    toast({
      title: "Chat exported",
      description: "Your conversation has been saved to a file.",
    });
  };

  const handleScrollUp = () => {
    scrollHistory('up');
    onOpenChange(false);
  };

  const handleScrollDown = () => {
    scrollHistory('down');
    onOpenChange(false);
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-[500px]">
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Chat Controls Section */}
          <CommandGroup heading="Chat Controls" className="pt-6 pb-2">
            <CommandItem onSelect={handleHelp} className="py-4">
              <HelpCircle className="mr-3 h-5 w-5 text-blue-600" />
              <span className="font-medium">Help</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            
            <CommandItem 
              onSelect={() => setShowClearConfirmation(true)} 
              className="py-4"
            >
              <Trash2 className="mr-3 h-5 w-5 text-red-600" />
              <span className="font-medium">Clear Chat</span>
              <CommandShortcut>⌘L</CommandShortcut>
            </CommandItem>
            
            <CommandItem 
              onSelect={() => setShowExitConfirmation(true)} 
              className="py-4"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-600" />
              <span className="font-medium">Exit Session</span>
              <CommandShortcut>⌘Q</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator className="my-2" />
          
          {/* AI Controls Section */}
          <CommandGroup heading="AI Controls" className="pt-6 pb-2">
            <CommandItem 
              onSelect={() => {
                onOpenChange(false);
                setTimeout(() => {
                  document.getElementById('model-select')?.click();
                }, 100);
              }} 
              className="py-4"
            >
              <div className="flex items-center mr-3 h-5 w-5 text-blue-600 justify-center">M</div>
              <span className="font-medium">Change Model</span>
              <span className="ml-auto mr-2 text-xs text-muted-foreground">
                {AI_MODELS.find(m => m.id === selectedModel)?.name}
              </span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
            
            <CommandItem onSelect={handleRetryResponse} className="py-4">
              <RefreshCw className="mr-3 h-5 w-5 text-blue-600" />
              <span className="font-medium">Retry Response</span>
              <CommandShortcut>⌘R</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator className="my-2" />
          
          {/* Navigation Section */}
          <CommandGroup heading="Navigation" className="pt-6 pb-2">
            <CommandItem onSelect={handleSaveChat} className="py-4">
              <Download className="mr-3 h-5 w-5 text-blue-600" />
              <span className="font-medium">Save Chat</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            
            <CommandItem onSelect={handleScrollUp} className="py-4">
              <ArrowUp className="mr-3 h-5 w-5 text-blue-600" />
              <span className="font-medium">Scroll Up</span>
              <CommandShortcut>⌘↑</CommandShortcut>
            </CommandItem>
            
            <CommandItem onSelect={handleScrollDown} className="py-4">
              <ArrowDown className="mr-3 h-5 w-5 text-blue-600" />
              <span className="font-medium">Scroll Down</span>
              <CommandShortcut>⌘↓</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Clear Chat Confirmation Dialog */}
      <Dialog open={showClearConfirmation} onOpenChange={setShowClearConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Chat</DialogTitle>
            <DialogDescription>
              This will delete all messages in the current conversation. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearConfirmation(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearChat}>
              Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Exit Session Confirmation Dialog */}
      <Dialog open={showExitConfirmation} onOpenChange={setShowExitConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Session</DialogTitle>
            <DialogDescription>
              This will end your current chat session. Any unsaved data will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleExitSession}>
              Exit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommandPalette;
