
# Project Files Explainer

This document provides an overview of all files in the project, organized by folder hierarchy. Each file is marked with an emoji indicating its importance based on imports:

- 🟢 (Green): Core file with many imports (high importance)
- 💛 (Yellow): Moderately important file with some imports
- 🔴 (Red): Support file with few or no imports

## Root Directory

- `.env` 🟢 - Environment configuration file containing the OpenRouter API key
- `README.md` 🟢 - Primary documentation with setup instructions and project overview
- `vite.config.ts` 💛 - Vite configuration for the project build process
- `index.html` 🟢 - Entry point HTML file for the web application
- `tailwind.config.ts` 💛 - Configuration for Tailwind CSS styling
- `tsconfig.json` 💛 - TypeScript configuration file
- `package.json` 🟢 - Project dependencies and script definitions

## /src Directory

- `main.tsx` 🟢 - Application entry point that renders the React app
- `App.tsx` 🟢 - Main application component that handles routing and initial setup
- `vite-env.d.ts` 🔴 - Type definitions for Vite environment variables
- `index.css` 💛 - Global CSS styles including Tailwind imports

### /src/pages

- `Index.tsx` 💛 - Main page component that wraps the chat interface
- `NotFound.tsx` 🔴 - 404 page for handling non-existent routes

### /src/components

- `ChatInterface.tsx` 🟢 - Main chat interface container component
- `MessageList.tsx` 🟢 - Component for displaying and paginating chat messages
- `MessageItem.tsx` 💛 - Individual message bubble component with formatting
- `InputArea.tsx` 🟢 - Text input component for sending messages
- `ModelSelector.tsx` 💛 - Dropdown for selecting different AI models
- `TypingIndicator.tsx` 🔴 - Visual indicator showing when AI is generating a response
- `CommandPalette.tsx` 💛 - Interface for executing chat commands
- `ApiKeyWarning.tsx` 🔴 - Component showing warning when API key is missing

### /src/components/ui

These are shadcn/ui components used throughout the application:

- `use-toast.ts` 🟢 - Hook for displaying toast notifications
- `button.tsx` 🟢 - Reusable button component
- `input.tsx` 🟢 - Text input component
- `select.tsx` 🟢 - Dropdown select component
- `separator.tsx` 🔴 - Visual separator component
- `aspect-ratio.tsx` 🔴 - Component for maintaining aspect ratios
- `skeleton.tsx` 🔴 - Loading skeleton placeholder
- `slider.tsx` 🔴 - Slider input component
- `sheet.tsx` 💛 - Slide-in panel component
- `sidebar.tsx` 💛 - Navigation sidebar component
- `command.tsx` 💛 - Command palette primitive
- `command-icon.tsx` 🔴 - Icon for the command interface

### /src/context

- `ChatContext.tsx` 🟢 - React context for managing chat state and operations

### /src/hooks

- `use-mobile.tsx` 🔴 - Hook for detecting mobile device viewport
- `use-toast.ts` 🟢 - Hook for displaying toast notifications

### /src/lib

- `utils.ts` 💛 - General utility functions used throughout the application

### /src/services

- `openRouterApi.ts` 🟢 - Service for handling API calls to OpenRouter

### /src/utils

- `commands.ts` 💛 - Utility functions for handling chat commands
- `validators.ts` 💛 - Functions for validating and sanitizing user input

### /src/config

- `constants.ts` 🟢 - Application-wide configuration and constants

### /src/types

- `index.ts` 🟢 - TypeScript type definitions used throughout the application

### /src/styles

- `command-palette.css` 🔴 - Specific styles for the command palette component

## /public Directory

- `favicon.ico` 🔴 - Website favicon
- `placeholder.svg` 🔴 - Default placeholder image
- `robots.txt` 🔴 - Instructions for web crawlers
