
import ChatInterface from '../components/ChatInterface';
import { ChatProvider } from '../context/ChatContext';

const Index = () => {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
};

export default Index;
