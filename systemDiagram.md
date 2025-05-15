
# System Architecture Diagram

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                            Client Application                           │
│                                                                         │
├─────────────┬───────────────────┬───────────────────┬──────────────────┤
│             │                   │                   │                  │
│  Pages      │  Components       │  Context          │  Hooks           │
│  -----      │  ----------       │  -------          │  -----           │
│  Index      │  ChatInterface    │  ChatContext      │  use-mobile      │
│  NotFound   │  MessageList      │                   │  use-toast       │
│             │  InputArea        │                   │                  │
│             │  ModelSelector    │                   │                  │
│             │  TypingIndicator  │                   │                  │
│             │                   │                   │                  │
└─────────────┴───────────────────┴───────────────────┴──────────────────┘
         │                 │                │                 │
         ▼                 ▼                ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                           Application Logic                             │
│                                                                         │
├─────────────┬───────────────────┬───────────────────┬──────────────────┤
│             │                   │                   │                  │
│  Services   │  Utils            │  Config           │  Types           │
│  --------   │  -----            │  ------           │  -----           │
│  OpenRouter │  commands.ts      │  constants.ts     │  Message         │
│  API        │  validators.ts    │                   │  ChatSession     │
│             │                   │                   │  ChatContextType │
│             │                   │                   │                  │
└─────────────┴───────────────────┴───────────────────┴──────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                           External Services                             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  OpenRouter API                                                         │
│  --------------                                                         │
│  - Chat Completions API                                                 │
│  - Multiple AI Model Access                                             │
│    (GPT-4o, Claude 3, etc.)                                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         Client-side Storage                             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Browser Storage                                                        │
│  ---------------                                                        │
│  - Session Storage for chat history                                     │
│  - Local Storage for user preferences                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **User Input Flow**:
   - User enters a message in the InputArea component
   - Message is sanitized via validators
   - ChatContext processes the message
   - If it's a command, it's handled by commands.ts
   - Otherwise, sent to OpenRouter API

2. **API Response Flow**:
   - Request is made to OpenRouter API via openRouterApi service
   - Response is processed by ChatContext
   - New message is added to the state
   - UI is updated to show the response in MessageList

3. **Command Handling Flow**:
   - Command is detected by starting with "/"
   - Parsed by commands.ts utilities
   - Appropriate action is taken (clear history, change model, etc.)
   - Feedback is provided to the user

4. **Storage Flow**:
   - Chat history is saved to session storage at regular intervals
   - Chat is restored from session storage when the app loads
   - Export functionality saves chats to file downloads

## Security Measures

- API key stored in environment variables (.env)
- User input sanitized to prevent XSS attacks
- Rate limiting enforced (30 requests per minute)
- Session timeout after 30 minutes of inactivity

## Component Relationships

- **ChatContext** is the central state manager
- **ChatInterface** orchestrates all chat UI components
- **MessageList** and **InputArea** handle display and input
- **ModelSelector** interacts with ChatContext to change models
- **openRouterApi.ts** handles all API communication
