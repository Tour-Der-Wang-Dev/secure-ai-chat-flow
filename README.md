
# OpenRouter Chat Application

A secure and professional chat interface built with OpenRouter's API, featuring real-time messaging, command system, and comprehensive security features.

![Chat Interface](https://placeholder.com/chat-interface)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd openrouter-chat-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Set up environment variables**

Create a `.env` file in the root directory with your OpenRouter API key:

```
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

You can get your API key from [OpenRouter](https://openrouter.ai/keys).

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Access the application**

Open your browser and navigate to `http://localhost:8080`

## 🛠️ Technologies

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **API Integration**: OpenRouter API
- **Form Handling**: react-hook-form
- **Data Fetching**: TanStack Query
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Charts/Graphs**: Recharts
- **Date Handling**: date-fns
- **Input Sanitization**: DOMPurify

## 🧩 Features

- Real-time messaging with AI models
- Message pagination with infinite scroll
- Command system (/help, /clear, /exit, /save, etc.)
- Model selection for different AI providers
- Rate limiting (30 requests/minute)
- Input sanitization for security
- Mobile responsive design
- Session timeout after inactivity
- Chat history export

## 🤝 Contributing

We welcome contributions to improve this application! Here's how you can help:

### Contribution Guidelines

1. **Fork the repository**

2. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
   - Follow the project's code style and conventions
   - Write meaningful commit messages
   - Add or update tests where appropriate

4. **Run tests and ensure code quality**

```bash
npm run test
npm run lint
```

5. **Submit a pull request**
   - Provide a clear description of your changes
   - Link any related issues

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Keep components small and focused
- Use Tailwind CSS for styling
- Document complex logic with comments

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- OpenRouter API for providing access to various AI models
- shadcn/ui for the excellent component library
- All contributors who have helped improve this project
