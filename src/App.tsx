
import { ChatProvider } from './context/ChatContext';
import ChatInterface from './components/ChatInterface';
import ApiKeyWarning from './components/ApiKeyWarning';

const App = () => {
  const apiKeyExists = !!import.meta.env.VITE_OPENROUTER_API_KEY;

  return (
    <ChatProvider>
      {!apiKeyExists ? <ApiKeyWarning /> : <ChatInterface />}
    </ChatProvider>
  );
};

export default App;
