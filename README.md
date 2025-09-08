# Real-Time Voice Translator

A sophisticated web application that provides real-time voice translation capabilities using advanced speech recognition, AI-powered translation, and text-to-speech technologies. Built with Next.js and powered by Google's Gemini AI.

## 🚀 Features

### Core Translation Features
- **Real-time Speech Recognition** - Convert speech to text using Web Speech API
- **Grammar Correction** - Automatic grammar, spelling, and punctuation correction before translation
- **AI-Powered Translation** - Translate text using Google Gemini 2.0 Flash model
- **Text-to-Speech Output** - Convert translated text back to speech with speed controls
- **Multi-language Support** - Support for 25+ languages including major Indian languages
- **Streaming Translation** - Real-time word-by-word translation updates
- **Auto-translate Mode** - Automatic translation as you speak

### User Interface Features
- **Modern Responsive Design** - Optimized for all screen sizes with contemporary UI patterns
- **Dark/Light Mode** - Automatic theme switching based on system preferences
- **Enhanced Visual Design** - Clean interface with green gradient theme and micro-interactions
- **Accessibility** - Screen reader support and keyboard navigation
- **Visual Feedback** - Real-time status indicators, animations, and progress feedback
- **Speed Controls** - Adjustable playback speed from 0.5x to 2x for audio output

### Advanced Features
- **Translation History** - Local storage of all translation sessions with timestamps
- **Export Functionality** - Export translation history as JSON files
- **Comprehensive Settings** - Adjust TTS voice, rate, pitch, volume, and grammar correction
- **Multiple Output Languages** - Translate to multiple languages simultaneously
- **Copy to Clipboard** - Easy copying of translated text
- **Reset Functionality** - Quick reset of all inputs and outputs
- **Grammar Toggle** - Enable/disable automatic grammar correction

## 🛠 Technologies Used

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript development

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework with custom design tokens
- **shadcn/ui** - High-quality React component library
- **Lucide React** - Beautiful icon library
- **Geist Font** - Modern typography (Sans & Mono)
- **CSS Animations** - Smooth transitions and micro-interactions

### APIs & Services
- **Google Gemini 2.0 Flash** - AI-powered translation and grammar correction
- **Web Speech API** - Browser-based speech recognition
- **Speech Synthesis API** - Browser-based text-to-speech with speed controls
- **Server-Sent Events (SSE)** - Real-time streaming updates

## 📁 File Structure

\`\`\`
voice-translator/
├── app/
│   ├── api/
│   │   ├── correct-grammar/
│   │   │   └── route.ts              # Grammar correction API endpoint
│   │   └── translate/
│   │       ├── route.ts              # Main translation API endpoint
│   │       └── stream/
│   │           └── route.ts          # Streaming translation API
│   ├── globals.css                   # Global styles with modern design tokens
│   ├── layout.tsx                    # Root layout with fonts and analytics
│   └── page.tsx                      # Main page component
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx               # Speed control slider
│   │   ├── switch.tsx               # Grammar toggle switch
│   │   ├── textarea.tsx
│   │   └── ...
│   ├── voice-translator.tsx         # Main translator component with modern UI
│   ├── settings-dialog.tsx          # Enhanced settings with grammar options
│   └── history-dialog.tsx           # Translation history modal
├── hooks/
│   ├── use-speech-recognition.ts    # Speech recognition hook
│   ├── use-text-to-speech.ts       # Enhanced TTS hook with speed controls
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
- Interim results are displayed as user speaks with visual feedback
- Final transcript is captured when user stops speaking

### 2. Grammar Correction (Optional)
- If enabled, text is first sent to `/api/correct-grammar` endpoint
- Gemini AI corrects grammar, spelling, and punctuation
- Corrected text is displayed with visual indication
- Users can toggle this feature on/off in settings

### 3. Translation Process
- Corrected (or original) text is sent to Gemini API via `/api/translate` endpoint
- AI processes the text and returns translations for all target languages
- Multiple target languages can be processed simultaneously
- Streaming mode provides word-by-word updates via Server-Sent Events

### 4. Audio Output
- Translated text is converted to speech using Speech Synthesis API
- Users can adjust playback speed from 0.5x to 2x using slider controls
- Voice selection and speech parameters are configurable in settings
- Auto-play option available for immediate audio feedback
- Manual playback controls for each translation with visual feedback

### 5. Data Management
- All translations are automatically saved to localStorage with timestamps
- History includes source text, corrected text, and all translations
- Users can export complete history as JSON files
- Settings and preferences are persisted across browser sessions

## 🎛 API Endpoints

### POST `/api/correct-grammar`
Corrects grammar, spelling, and punctuation in the input text.

**Request Body:**
\`\`\`json
{
  "text": "hello world how are you doing today"
}
\`\`\`

**Response:**
\`\`\`json
{
  "correctedText": "Hello world! How are you doing today?",
  "corrections": ["Added capitalization", "Added punctuation"]
}
\`\`\`

### POST `/api/translate`
Translates text to specified target languages.

**Request Body:**
\`\`\`json
{
  "text": "Hello world! How are you doing today?",
  "targetLanguages": ["es", "fr", "hi"],
  "sourceLanguage": "en"
}
\`\`\`

**Response:**
\`\`\`json
{
  "translations": {
    "es": "¡Hola mundo! ¿Cómo estás hoy?",
    "fr": "Bonjour le monde! Comment allez-vous aujourd'hui?",
    "hi": "नमस्ते दुनिया! आज आप कैसे हैं?"
  },
  "detectedLanguage": "en"
}
\`\`\`

### POST `/api/translate/stream`
Provides streaming translation updates via Server-Sent Events.

**Request Body:** Same as `/api/translate`

**Response:** SSE stream with progressive translation updates

## 🎨 Design System

### Color Palette
- **Primary:** Modern green (`oklch(0.45 0.15 162.4)`)
- **Secondary:** Lighter green variants
- **Background:** Clean gradients and glass morphism effects
- **Accent:** Complementary green tones with subtle animations

### Typography
- **Headings:** Geist Sans with improved hierarchy
- **Body:** Geist Sans with optimized line heights
- **Code:** Geist Mono for technical content

### Layout Principles
- Mobile-first responsive design with enhanced breakpoints
- Flexbox-based layouts with improved spacing
- Card-based components with subtle shadows and backdrop blur
- Smooth animations and micro-interactions
- Semantic HTML structure for accessibility

### Interactive Elements
- Hover animations on buttons and cards
- Loading states with skeleton animations
- Progress indicators for ongoing operations
- Visual feedback for all user interactions

## 🔧 Configuration

### Grammar Correction Settings
- Toggle grammar correction on/off
- Automatic correction before translation
- Visual indication of corrections made

### Speech Recognition Settings
- Language detection: Automatic
- Continuous recognition: Enabled
- Interim results: Enabled for real-time feedback
- Enhanced error handling and recovery

### Text-to-Speech Settings
- Configurable voice selection by language
- Adjustable playback speed (0.5x to 2x)
- Adjustable rate, pitch, and volume
- Auto-play options for translated content

## 🐛 Troubleshooting

### Common Issues

**Grammar correction not working:**
- Verify API key has access to Gemini models
- Check network connection and API quotas
- Ensure input text is not empty

**Speed controls not responding:**
- Check browser's Speech Synthesis API support
- Verify audio output device is connected
- Try different playback speeds to test functionality

**Translation errors with Indian languages:**
- Ensure proper language codes are used
- Check API support for specific Indian languages
- Verify text encoding for non-Latin scripts

### Browser Compatibility
- **Chrome/Edge:** Full support for all features including speed controls
- **Firefox:** Limited Speech Recognition support, TTS speed may vary
- **Safari:** Partial support, may require user interaction for audio and speed controls

## 📈 Performance Optimization

- **Enhanced debouncing** - Prevents excessive API calls for grammar correction and translation
- **Streaming responses** - Reduces perceived latency with real-time updates
- **Optimized state management** - Efficient React state updates and re-renders
- **Local storage optimization** - Compressed history storage
- **Lazy loading** - Components and features loaded on demand
- **Bundle optimization** - Tree-shaking and code splitting for faster loads

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
