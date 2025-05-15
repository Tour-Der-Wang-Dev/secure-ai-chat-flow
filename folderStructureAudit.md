
# Folder Structure Audit

## Current Structure

```
/
├── .env                   # Environment variables
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   └── ui/            # UI components from shadcn/ui
│   ├── config/            # Configuration files
│   ├── context/           # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── styles/            # CSS files
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
└── ...                    # Configuration files
```

## Analysis

The current folder structure follows common React practices but has some areas for improvement:

1. **Inconsistent organization**: Some utilities are in `/lib` while others are in `/utils`
2. **Mixed component types**: Regular components and UI components are separated, but feature-specific components aren't grouped
3. **Flat component structure**: As the app grows, the flat component directory will become unwieldy
4. **Missing feature-oriented organization**: Related components, hooks, and utilities aren't grouped by feature

## Recommendations

### 1. Reorganize by Features

Consider restructuring to a feature-based organization:

```
/src/
├── features/
│   ├── chat/                  # Chat feature
│   │   ├── components/        # Chat-specific components
│   │   ├── hooks/             # Chat-specific hooks
│   │   ├── utils/             # Chat-specific utilities
│   │   └── chat-context.tsx   # Chat context
│   ├── models/                # Model selection feature
│   │   ├── components/        # Model-specific components
│   │   └── hooks/             # Model-specific hooks
│   └── commands/              # Command system feature
│       ├── components/        # Command-specific components
│       └── utils/             # Command-specific utilities
├── common/                    # Shared code
│   ├── components/            # Shared components
│   ├── hooks/                 # Shared hooks
│   └── utils/                 # Shared utilities
├── ui/                        # UI component library
├── services/                  # API services
├── config/                    # Configuration
└── types/                     # TypeScript types
```

### 2. Consolidate Utility Directories

Merge `/lib` and `/utils` into a single location for all utilities.

### 3. Group Related Components

Group related components into subdirectories, especially as the application grows:

```
/components/
├── chat/
│   ├── ChatInterface.tsx
│   ├── MessageList.tsx
│   ├── MessageItem.tsx
│   └── InputArea.tsx
├── model/
│   └── ModelSelector.tsx
└── shared/
    ├── TypingIndicator.tsx
    └── ApiKeyWarning.tsx
```

### 4. Adopt a Common Pattern for Exports

Use index files for cleaner imports:

```typescript
// src/features/chat/components/index.ts
export { default as ChatInterface } from './ChatInterface';
export { default as MessageList } from './MessageList';
export { default as MessageItem } from './MessageItem';
export { default as InputArea } from './InputArea';
```

This allows:

```typescript
import { ChatInterface, MessageList } from '@/features/chat/components';
```

### 5. Implement Proper Path Aliases

Update the tsconfig.json to include path aliases for cleaner imports:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/features/*": ["src/features/*"],
      "@/common/*": ["src/common/*"],
      "@/ui/*": ["src/ui/*"],
      "@/services/*": ["src/services/*"],
      "@/config/*": ["src/config/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

### 6. Create Component Templates

Standardize component creation with a consistent structure:

```typescript
// Component template
import React from 'react';
import type { ComponentProps } from '@/types';

export interface ExampleProps extends ComponentProps {
  // component-specific props
}

export const Example: React.FC<ExampleProps> = ({ /* props */ }) => {
  // component logic
  return (
    // JSX
  );
};

export default Example;
```

## Implementation Plan

1. **Phase 1**: Consolidate `/lib` and `/utils` directories
2. **Phase 2**: Implement path aliases for cleaner imports
3. **Phase 3**: Reorganize components into logical groupings
4. **Phase 4**: Migrate to a feature-based structure
5. **Phase 5**: Update imports throughout the application

This transition can be done incrementally to minimize disruption to development workflow.
