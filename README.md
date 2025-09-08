# Real-Time Voice Translator

A sophisticated web application that provides real-time voice translation capabilities using advanced speech recognition, AI-powered translation, and text-to-speech technologies. Built with Next.js and powered by Google's Gemini AI.

## 🚀 Features

### Core Translation Features
- **Real-time Speech Recognition** - Convert speech to text using Web Speech API
- **AI-Powered Translation** - Translate text using Google Gemini 2.0 Flash model
- **Text-to-Speech Output** - Convert translated text back to speech
- **Multi-language Support** - Support for 25+ languages including major Indian languages
- **Streaming Translation** - Real-time word-by-word translation updates
- **Auto-translate Mode** - Automatic translation as you speak

### User Interface Features
- **Responsive Design** - Optimized for all screen sizes (mobile, tablet, desktop)
- **Dark/Light Mode** - Automatic theme switching based on system preferences
- **Modern UI** - Clean, professional interface with emerald color scheme
- **Accessibility** - Screen reader support and keyboard navigation
- **Visual Feedback** - Real-time status indicators and progress feedback

### Advanced Features
- **Translation History** - Local storage of all translation sessions
- **Export Functionality** - Export translation history as JSON
- **Customizable Settings** - Adjust TTS voice, rate, pitch, and volume
- **Multiple Output Languages** - Translate to multiple languages simultaneously
- **Copy to Clipboard** - Easy copying of translated text
- **Reset Functionality** - Quick reset of all inputs and outputs

## 🛠 Technologies Used

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript development

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React component library
- **Lucide React** - Beautiful icon library
- **Geist Font** - Modern typography (Sans & Mono)

### APIs & Services
- **Google Gemini 2.0 Flash** - AI-powered translation service
- **Web Speech API** - Browser-based speech recognition
- **Speech Synthesis API** - Browser-based text-to-speech
- **Server-Sent Events (SSE)** - Real-time streaming updates

### Development Tools
- **ESLint** - Code linting and formatting
- **Vercel Analytics** - Performance monitoring
- **Custom React Hooks** - Reusable logic components

## 📁 File Structure

\`\`\`
voice-translator/
├── app/
│   ├── api/
│   │   └── translate/
│   │       ├── route.ts              # Main translation API endpoint
│   │       └── stream/
│   │           └── route.ts          # Streaming translation API
│   ├── globals.css                   # Global styles and theme tokens
│   ├── layout.tsx                    # Root layout with fonts and analytics
│   └── page.tsx                      # Main page component
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   └── ...
│   ├── voice-translator.tsx         # Main translator component
│   ├── settings-dialog.tsx          # Settings configuration modal
│   └── history-dialog.tsx           # Translation history modal
├── hooks/
│   ├── use-speech-recognition.ts    # Speech recognition hook
│   ├── use-text-to-speech.ts       # Text-to-speech hook
│   ├── use-streaming-translation.ts # Streaming translation hook
│   ├── use-translation-history.ts   # History management hook
│   ├── use-mobile.ts               # Mobile detection hook
│   └── use-toast.ts                # Toast notifications hook
├── lib/
│   └── utils.ts                     # Utility functions (cn, etc.)
├── next.config.mjs                  # Next.js configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
\`\`\`

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Google Cloud account with Gemini API access
- Modern web browser with Web Speech API support

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd voice-translator
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure API Key**
   - Get your Gemini API key from Google AI Studio
   - The application uses the key: `AIzaSyCH11Alz5Zq7vqna7bC4-Up81JVmQx6zBI`
   - Key is configured in the API routes (`app/api/translate/route.ts`)

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open the application**
   - Navigate to `http://localhost:3000`
   - Grant microphone permissions when prompted

## 🌐 Supported Languages

### European Languages
- English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Polish, Swedish, Norwegian, Danish, Finnish

### Asian Languages
- Chinese (Simplified & Traditional), Japanese, Korean, Thai, Vietnamese, Indonesian, Malay

### Indian Subcontinent Languages
- Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu, Odia, Assamese, Nepali, Sinhala

### Middle Eastern & African Languages
- Arabic, Hebrew, Turkish, Persian, Swahili

## 🔄 Workflow

### 1. Speech Input
- User clicks microphone button to start recording
- Web Speech API converts speech to text in real-time
- Interim results are displayed as user speaks
- Final transcript is captured when user stops speaking

### 2. Translation Process
- Text is sent to Gemini API via `/api/translate` endpoint
- AI processes the text and returns translations
- Multiple target languages can be processed simultaneously
- Streaming mode provides word-by-word updates via SSE

### 3. Audio Output
- Translated text is converted to speech using Speech Synthesis API
- Users can select different voices and adjust speech parameters
- Auto-play option available for immediate audio feedback
- Manual playback controls for each translation

### 4. Data Management
- All translations are automatically saved to localStorage
- History includes timestamps, source text, and all translations
- Users can export history as JSON files
- Settings are persisted across browser sessions

## 🎛 API Endpoints

### POST `/api/translate`
Translates text to specified target languages.

**Request Body:**
\`\`\`json
{
  "text": "Hello world",
  "targetLanguages": ["es", "fr", "hi"],
  "sourceLanguage": "en"
}
\`\`\`

**Response:**
\`\`\`json
{
  "translations": {
    "es": "Hola mundo",
    "fr": "Bonjour le monde",
    "hi": "नमस्ते दुनिया"
  },
  "detectedLanguage": "en"
}
\`\`\`

### POST `/api/translate/stream`
Provides streaming translation updates via Server-Sent Events.

**Request Body:** Same as above

**Response:** SSE stream with progressive translation updates

## 🎨 Design System

### Color Palette
- **Primary:** Emerald green (`oklch(0.45 0.15 162.4)`)
- **Secondary:** Lighter emerald (`oklch(0.55 0.15 162.4)`)
- **Background:** Clean white/dark gray
- **Accent:** Complementary emerald tones

### Typography
- **Headings:** Geist Sans (various weights)
- **Body:** Geist Sans (regular)
- **Code:** Geist Mono

### Layout Principles
- Mobile-first responsive design
- Flexbox-based layouts
- Consistent spacing using Tailwind's gap system
- Semantic HTML structure for accessibility

## 🔧 Configuration

### Environment Variables
The application uses a hardcoded Gemini API key. For production deployment, consider using environment variables:

\`\`\`env
GEMINI_API_KEY=your_api_key_here
\`\`\`

### Speech Recognition Settings
- Language detection: Automatic
- Continuous recognition: Enabled
- Interim results: Enabled for real-time feedback

### Text-to-Speech Settings
- Configurable voice selection
- Adjustable rate (0.5x to 2x speed)
- Adjustable pitch (0.5 to 2.0)
- Adjustable volume (0 to 1.0)

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically with zero configuration
4. Set environment variables in Vercel dashboard

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🐛 Troubleshooting

### Common Issues

**Microphone not working:**
- Ensure HTTPS connection (required for Web Speech API)
- Grant microphone permissions in browser
- Check browser compatibility

**Translation errors:**
- Verify API key is valid and has sufficient quota
- Check network connection
- Ensure target language is supported

**Audio playback issues:**
- Check browser's autoplay policies
- Ensure speakers/headphones are connected
- Verify Speech Synthesis API support

### Browser Compatibility
- **Chrome/Edge:** Full support for all features
- **Firefox:** Limited Speech Recognition support
- **Safari:** Partial support, may require user interaction for audio

## 📈 Performance Optimization

- **Debounced API calls** - Prevents excessive translation requests
- **Streaming responses** - Reduces perceived latency
- **Local storage** - Offline access to translation history
- **Lazy loading** - Components loaded on demand
- **Optimized bundle** - Tree-shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for translation capabilities
- shadcn/ui for beautiful React components
- Vercel for hosting and deployment platform
- Web Speech API for browser-based speech recognition
- Tailwind CSS for utility-first styling approach
