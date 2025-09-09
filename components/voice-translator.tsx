"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ClickableText } from "@/components/clickable-text";
import { GrammarAnalysisDialog } from "@/components/grammar-analysis-dialog";
import { IntroSection } from "@/components/intro-section";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";
import { QuickTips } from "@/components/quick-tips";
import { StatusIndicator } from "@/components/status-indicator";
import {
  Mic,
  MicOff,
  Play,
  Copy,
  Plus,
  X,
  AlertCircle,
  Square,
  Zap,
  RotateCcw,
  Globe,
  Languages,
  BookOpen,
  Volume2,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { useStreamingTranslation } from "@/hooks/use-streaming-translation";
import { useTranslationHistory } from "@/hooks/use-translation-history";
import { SettingsDialog } from "@/components/settings-dialog";
import { HistoryDialog } from "@/components/history-dialog";

interface OutputLanguage {
  code: string;
  name: string;
  text: string;
}

function VoiceTranslatorComponent() {
  const [showIntro, setShowIntro] = useState(true);
  const [inputText, setInputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("auto");
  const [outputLanguages, setOutputLanguages] = useState<OutputLanguage[]>([
    { code: "hi", name: "Hindi", text: "" },
    { code: "mr", name: "Marathi", text: "" },
  ]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null
  );
  const [streamingMode, setStreamingMode] = useState(false);
  const [isCorrectingGrammar, setIsCorrectingGrammar] = useState(false);
  const [grammarCorrectionEnabled, setGrammarCorrectionEnabled] =
    useState(true);
  const [speechSpeed, setSpeechSpeed] = useState(0.8); // Slower default speed for better comprehension

  const languages = [
    { code: "auto", name: "Auto-detect" },
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },

    { code: "bn", name: "Bengali" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "mr", name: "Marathi" },
    { code: "gu", name: "Gujarati" },
    { code: "kn", name: "Kannada" },
    { code: "ml", name: "Malayalam" },
    { code: "pa", name: "Punjabi" },
    { code: "ur", name: "Urdu" },
    { code: "or", name: "Odia" },
    { code: "as", name: "Assamese" },
    { code: "ne", name: "Nepali" },
    { code: "si", name: "Sinhala" },
  ];

  const { addEntry } = useTranslationHistory();

  const {
    isSupported: isSpeechSupported,
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    error: speechRecognitionError,
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    language:
      inputLanguage === "auto"
        ? "en-US"
        : `${inputLanguage}-${inputLanguage.toUpperCase()}`,
    onResult: (transcript: string, isFinal: boolean) => {
      console.log("[v0] Speech recognition result:", {
        transcript,
        isFinal,
        autoTranslate,
      });
      if (isFinal) {
        setInputText((prev) => {
          const newText = prev + transcript + " ";
          console.log("[v0] Updated input text:", newText);
          return newText;
        });
        if (autoTranslate) {
          setTimeout(() => {
            console.log("[v0] Auto-translating after speech recognition");
            if (streamingMode) {
              startStreamingTranslation();
            } else {
              translateText();
            }
          }, 1000); // Increased delay to 1 second for better stability
        }
      }
    },
    onError: (error: string) => {
      console.log("[v0] Speech recognition error:", error);
      setSpeechError(error);
    },
    onStart: () => {
      console.log("[v0] Speech recognition started");
      setSpeechError(null);
    },
  });

  const {
    isSupported: isTTSSupported,
    isSpeaking,
    speak,
    stop: stopSpeaking,
    setRate,
    error: ttsError,
  } = useTextToSpeech({
    rate: speechSpeed, // Use dynamic speech speed
    pitch: 1,
    volume: 1,
    onStart: () => {
      // TTS started
    },
    onEnd: () => {
      setCurrentPlayingIndex(null);
    },
    onError: (error: string) => {
      setSpeechError(error);
      setCurrentPlayingIndex(null);
    },
  });

  const {
    isStreaming,
    streamingResults,
    startStreaming,
    stopStreaming,
    error: streamingError,
  } = useStreamingTranslation({
    onProgress: (language: string, text: string, isComplete: boolean) => {
      setOutputLanguages((prev) =>
        prev.map((output) =>
          output.code === language ? { ...output, text } : output
        )
      );
    },
    onComplete: (results: Record<string, string>) => {
      // Save to history
      saveToHistory(results);

      // Auto-play first translation if enabled
      if (autoPlay && outputLanguages.length > 0) {
        const firstLang = outputLanguages[0];
        const firstResult = results[firstLang.code];
        if (firstResult) {
          setTimeout(() => {
            playAudio(firstResult, firstLang.code, 0);
          }, 500);
        }
      }
    },
    onError: (error: string) => {
      setTranslationError(error);
    },
  });

  useEffect(() => {
    if (transcript || interimTranscript) {
      const fullText = transcript + interimTranscript;
      console.log("[v0] Updating input text from speech:", {
        transcript,
        interimTranscript,
        fullText,
      });
      setInputText(fullText);
    }
  }, [transcript, interimTranscript]);

  useEffect(() => {
    if (speechRecognitionError) {
      console.log("[v0] Setting speech error:", speechRecognitionError);
      setSpeechError(speechRecognitionError);
    }
  }, [speechRecognitionError]);

  useEffect(() => {
    if (ttsError) {
      console.log("[v0] Setting TTS error:", ttsError);
      setSpeechError(ttsError);
    }
  }, [ttsError]);

  useEffect(() => {
    if (streamingError) {
      console.log("[v0] Setting streaming error:", streamingError);
      setTranslationError(streamingError);
    }
  }, [streamingError]);

  const toggleRecording = () => {
    console.log("[v0] Toggle recording called:", {
      isListening,
      isSpeechSupported,
    });
    if (isListening) {
      stopListening();
    } else {
      if (!isSpeechSupported) {
        const errorMsg =
          "Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.";
        console.log("[v0] Speech not supported:", errorMsg);
        setSpeechError(errorMsg);
        return;
      }
      setSpeechError(null);
      setTranslationError(null);
      resetTranscript();
      setInputText("");
      startListening();
    }
  };

  const addOutputLanguage = () => {
    const availableLanguages = languages.filter(
      (lang) =>
        lang.code !== "auto" &&
        !outputLanguages.some((output) => output.code === lang.code)
    );

    if (availableLanguages.length > 0) {
      setOutputLanguages([
        ...outputLanguages,
        {
          code: availableLanguages[0].code,
          name: availableLanguages[0].name,
          text: "",
        },
      ]);
    }
  };

  const removeOutputLanguage = (index: number) => {
    setOutputLanguages(outputLanguages.filter((_, i) => i !== index));
  };

  const updateOutputLanguage = (index: number, code: string) => {
    const language = languages.find((lang) => lang.code === code);
    if (language) {
      const updated = [...outputLanguages];
      updated[index] = { ...updated[index], code, name: language.name };
      setOutputLanguages(updated);
    }
  };

  const startStreamingTranslation = async () => {
    if (!inputText.trim()) {
      console.log("[v0] No input text for streaming translation");
      return;
    }

    console.log("[v0] Starting streaming translation:", {
      inputText,
      inputLanguage,
      outputLanguages,
    });
    setTranslationError(null);

    let textToTranslate = inputText;
    if (grammarCorrectionEnabled) {
      textToTranslate = await correctGrammar(inputText);
      // Update input text with corrected version
      if (textToTranslate !== inputText) {
        setInputText(textToTranslate);
      }
    }

    // Clear existing translations
    setOutputLanguages((prev) =>
      prev.map((output) => ({ ...output, text: "" }))
    );

    startStreaming(
      textToTranslate, // Use corrected text
      inputLanguage,
      outputLanguages.map((lang) => lang.code)
    );
  };

  const translateText = async () => {
    if (!inputText.trim()) {
      console.log("[v0] No input text for translation");
      return;
    }

    console.log("[v0] Starting translation:", {
      inputText,
      inputLanguage,
      outputLanguages,
    });
    setIsTranslating(true);
    setTranslationError(null);

    try {
      let textToTranslate = inputText;
      if (grammarCorrectionEnabled) {
        textToTranslate = await correctGrammar(inputText);
        // Update input text with corrected version
        if (textToTranslate !== inputText) {
          setInputText(textToTranslate);
        }
      }

      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToTranslate, // Use corrected text
          inputLang: inputLanguage,
          outputLangs: outputLanguages.map((lang) => lang.code),
          stream: false,
        }),
      });

      const data = await response.json();
      console.log("[v0] Translation response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Translation failed");
      }

      if (data.success && data.translations) {
        const updatedOutputs = outputLanguages.map((output) => {
          const translation = data.translations.find(
            (t: any) => t.language === output.code
          );
          return {
            ...output,
            text: translation?.text || "Translation not available",
          };
        });

        console.log("[v0] Updated outputs:", updatedOutputs);
        setOutputLanguages(updatedOutputs);

        if (inputLanguage === "auto" && data.detectedLanguage) {
          console.log("[v0] Detected language:", data.detectedLanguage);
          setDetectedLanguage(data.detectedLanguage);
        }

        // Save to history
        saveToHistory();

        // Auto-play first translation if enabled
        if (autoPlay && updatedOutputs.length > 0 && updatedOutputs[0].text) {
          console.log("[v0] Auto-playing first translation");
          setTimeout(() => {
            playAudio(updatedOutputs[0].text, updatedOutputs[0].code, 0);
          }, 500);
        }
      }
    } catch (error) {
      console.error("[v0] Translation error:", error);
      setTranslationError(
        error instanceof Error ? error.message : "Translation failed"
      );
    } finally {
      setIsTranslating(false);
    }
  };

  const playAudio = (text: string, languageCode: string, index?: number) => {
    if (!text.trim()) {
      console.log("[v0] No text to play");
      return;
    }

    console.log("[v0] Playing audio:", {
      text,
      languageCode,
      index,
      speechSpeed,
    });

    if (!isTTSSupported) {
      const errorMsg = "Text-to-speech is not supported in this browser.";
      console.log("[v0] TTS not supported:", errorMsg);
      setSpeechError(errorMsg);
      return;
    }

    // Stop current speech if playing
    if (isSpeaking) {
      console.log("[v0] Stopping current speech");
      stopSpeaking();
      if (currentPlayingIndex === index) {
        setCurrentPlayingIndex(null);
        return;
      }
    }

    setCurrentPlayingIndex(index ?? null);
    setRate(speechSpeed);
    speak(text, languageCode);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTranslate = () => {
    if (streamingMode) {
      if (isStreaming) {
        stopStreaming();
      } else {
        startStreamingTranslation();
      }
    } else {
      translateText();
    }
  };

  const saveToHistory = (results?: Record<string, string>) => {
    if (!inputText.trim()) return;

    const translations = outputLanguages
      .map((output) => ({
        language: output.code,
        languageName: output.name,
        text: results ? results[output.code] || output.text : output.text,
      }))
      .filter((t) => t.text && t.text.trim());

    if (translations.length > 0) {
      addEntry({
        inputText: inputText.trim(),
        inputLanguage,
        detectedLanguage,
        translations,
      });
    }
  };

  const resetAll = () => {
    console.log("[v0] Resetting all state");
    // Stop any ongoing operations
    if (isListening) {
      console.log("[v0] Stopping speech recognition");
      stopListening();
    }
    if (isSpeaking) {
      console.log("[v0] Stopping TTS");
      stopSpeaking();
    }
    if (isStreaming) {
      console.log("[v0] Stopping streaming");
      stopStreaming();
    }

    // Clear all state
    setInputText("");
    resetTranscript();
    setOutputLanguages((prev) =>
      prev.map((output) => ({ ...output, text: "" }))
    );
    setTranslationError(null);
    setSpeechError(null);
    setDetectedLanguage(null);
    setCurrentPlayingIndex(null);
    setIsTranslating(false);
    console.log("[v0] Reset complete");
  };

  const correctGrammar = async (text: string): Promise<string> => {
    if (!grammarCorrectionEnabled || !text.trim()) {
      return text;
    }

    console.log("[v0] Starting grammar correction:", { text });
    setIsCorrectingGrammar(true);

    try {
      const response = await fetch("/api/correct-grammar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      console.log("[v0] Grammar correction response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Grammar correction failed");
      }

      if (data.success && data.correctedText) {
        console.log("[v0] Grammar corrected:", {
          original: text,
          corrected: data.correctedText,
        });
        return data.correctedText;
      }

      return text;
    } catch (error) {
      console.error("[v0] Grammar correction error:", error);
      // Return original text if correction fails
      return text;
    } finally {
      setIsCorrectingGrammar(false);
    }
  };

  const handleContinue = () => {
    setShowIntro(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {showIntro && <IntroSection onContinue={handleContinue} />}

      {!showIntro && (
        <>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Background Elements */}
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
            <AppHeader />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 animate-slide-up">
              <div className="flex items-center gap-2">
                <HistoryDialog />
                <SettingsDialog />
              </div>
            </div>

            {translationError && (
              <Alert variant="destructive" className="mb-6 animate-scale-in">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{translationError}</AlertDescription>
              </Alert>
            )}

            {speechError && (
              <Alert variant="destructive" className="mb-6 animate-scale-in">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{speechError}</AlertDescription>
              </Alert>
            )}

            {!isSpeechSupported && (
              <Alert className="mb-6 animate-scale-in">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Speech recognition is not supported in this browser. Voice
                  input will not be available.
                </AlertDescription>
              </Alert>
            )}

            {!isTTSSupported && (
              <Alert className="mb-6 animate-scale-in">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Text-to-speech is not supported in this browser. Audio
                  playback will not be available.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 animate-slide-up">
              <Card className="p-6 lg:p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mic className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold text-card-foreground">
                        Input
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {detectedLanguage && inputLanguage === "auto" && (
                        <Badge
                          variant="secondary"
                          className="text-xs animate-scale-in"
                        >
                          Detected:{" "}
                          {languages.find((l) => l.code === detectedLanguage)
                            ?.name || detectedLanguage}
                        </Badge>
                      )}
                      <Select
                        value={inputLanguage}
                        onValueChange={setInputLanguage}
                      >
                        <SelectTrigger className="w-full sm:w-44 bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Type or speak your text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-32 lg:min-h-40 resize-none text-base bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />

                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Smart Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="auto-translate"
                          checked={autoTranslate}
                          onChange={(e) => setAutoTranslate(e.target.checked)}
                          className="rounded border-border accent-primary"
                        />
                        <label
                          htmlFor="auto-translate"
                          className="text-sm text-muted-foreground"
                        >
                          Auto-translate as I speak
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="auto-play"
                          checked={autoPlay}
                          onChange={(e) => setAutoPlay(e.target.checked)}
                          className="rounded border-border accent-primary"
                        />
                        <label
                          htmlFor="auto-play"
                          className="text-sm text-muted-foreground"
                        >
                          Auto-play translated speech
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="grammar-correction"
                          checked={grammarCorrectionEnabled}
                          onChange={(e) =>
                            setGrammarCorrectionEnabled(e.target.checked)
                          }
                          className="rounded border-border accent-primary"
                        />
                        <label
                          htmlFor="grammar-correction"
                          className="text-sm text-muted-foreground"
                        >
                          Auto-correct grammar & spelling
                        </label>
                      </div>

                      <div className="flex items-center gap-3 sm:col-span-2">
                        <input
                          type="checkbox"
                          id="streaming-mode"
                          checked={streamingMode}
                          onChange={(e) => setStreamingMode(e.target.checked)}
                          className="rounded border-border accent-primary"
                        />
                        <label
                          htmlFor="streaming-mode"
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <Zap className="h-4 w-4 text-primary" />
                          Real-time streaming mode
                        </label>
                      </div>

                      <div className="flex items-center gap-3 sm:col-span-2">
                        <label
                          htmlFor="speech-speed"
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <Volume2 className="h-4 w-4 text-primary" />
                          Speech Speed: {speechSpeed}x
                        </label>
                        <input
                          type="range"
                          id="speech-speed"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={speechSpeed}
                          onChange={(e) =>
                            setSpeechSpeed(Number.parseFloat(e.target.value))
                          }
                          className="flex-1 accent-primary"
                        />
                        <span className="text-xs text-muted-foreground min-w-[3rem] text-right">
                          {speechSpeed === 0.5
                            ? "Slow"
                            : speechSpeed === 1
                            ? "Normal"
                            : speechSpeed === 2
                            ? "Fast"
                            : "Custom"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={toggleRecording}
                      variant={isListening ? "destructive" : "default"}
                      size="lg"
                      className="w-full h-14 text-base font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      disabled={!isSpeechSupported}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="h-5 w-5 mr-3" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5 mr-3" />
                          Start Recording
                        </>
                      )}
                    </Button>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleTranslate}
                        disabled={
                          !inputText.trim() ||
                          (isTranslating && !streamingMode) ||
                          isCorrectingGrammar
                        }
                        className="flex-1 h-12 font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {isCorrectingGrammar ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Correcting Grammar...
                          </>
                        ) : streamingMode ? (
                          isStreaming ? (
                            <>
                              <Square className="h-4 w-4 mr-2" />
                              Stop Stream
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Start Stream
                            </>
                          )
                        ) : isTranslating ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4 mr-2" />
                            Translate
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={resetAll}
                        variant="outline"
                        className="px-6 h-12 font-semibold bg-background/50 hover:bg-background transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        title="Reset all inputs and outputs"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  {isListening && (
                    <div className="space-y-3 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-scale-in">
                      <div className="flex items-center gap-3 text-sm font-medium text-primary">
                        <div className="relative">
                          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                          <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping opacity-75" />
                        </div>
                        Listening for speech...
                      </div>
                      {interimTranscript && (
                        <div className="text-sm text-muted-foreground italic p-3 bg-background/50 rounded border border-border/50">
                          "{interimTranscript}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6 lg:p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Languages className="h-5 w-5 text-secondary" />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold text-card-foreground">
                        Output
                      </h2>
                    </div>
                    <Button
                      onClick={addOutputLanguage}
                      variant="outline"
                      size="sm"
                      className="self-start sm:self-auto bg-background/50 hover:bg-background transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Language
                    </Button>
                  </div>

                  <div className="space-y-4 max-h-96 lg:max-h-[32rem] overflow-y-auto">
                    {outputLanguages.map((output, index) => (
                      <Card
                        key={index}
                        className="p-4 lg:p-5 bg-background/30 border border-border/50 hover:bg-background/50 transition-all duration-200 animate-slide-up"
                      >
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <Select
                              value={output.code}
                              onValueChange={(value) =>
                                updateOutputLanguage(index, value)
                              }
                            >
                              <SelectTrigger className="w-full sm:w-36 bg-background/50">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {languages
                                  .filter((lang) => lang.code !== "auto")
                                  .map((lang) => (
                                    <SelectItem
                                      key={lang.code}
                                      value={lang.code}
                                    >
                                      {lang.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            <div className="flex items-center gap-2 self-start sm:self-auto">
                              {isStreaming && streamingResults[output.code] && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs animate-scale-in"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                    Streaming
                                  </div>
                                </Badge>
                              )}
                              <Button
                                onClick={() => removeOutputLanguage(index)}
                                variant="ghost"
                                size="sm"
                                className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="min-h-20 lg:min-h-24 p-4 bg-background/70 rounded-lg border border-border/50 text-sm lg:text-base">
                            {output.text ? (
                              <ClickableText
                                text={output.text}
                                language={output.name}
                                className="leading-relaxed"
                              />
                            ) : (
                              <span className="text-muted-foreground italic">
                                Translation will appear here...
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              onClick={() =>
                                playAudio(output.text, output.code, index)
                              }
                              variant="outline"
                              size="sm"
                              disabled={!output.text || !isTTSSupported}
                              className="flex-1 sm:flex-none bg-background/50 hover:bg-background transition-all duration-200 hover:scale-[1.02] py-2"
                            >
                              {currentPlayingIndex === index && isSpeaking ? (
                                <>
                                  <Square className="h-4 w-4 mr-2" />
                                  Stop
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Play
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() => copyToClipboard(output.text)}
                              variant="outline"
                              size="sm"
                              disabled={!output.text}
                              className="flex-1 sm:flex-none bg-background/50 hover:bg-background transition-all duration-200 hover:scale-[1.02] py-2"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </Button>
                            <GrammarAnalysisDialog
                              text={output.text}
                              language={output.name}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={!output.text}
                                className="flex-1 sm:flex-none bg-background/50 hover:bg-background transition-all duration-200 hover:scale-[1.02] py-2"
                              >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Grammar
                              </Button>
                            </GrammarAnalysisDialog>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {outputLanguages.length === 0 && (
                    <div className="text-center py-8 lg:py-12 text-muted-foreground animate-fade-in">
                      <div className="p-4 bg-muted/30 rounded-2xl inline-block mb-4">
                        <Languages className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                      <p className="text-base lg:text-lg mb-4">
                        No output languages selected
                      </p>
                      <Button
                        onClick={addOutputLanguage}
                        variant="outline"
                        className="bg-background/50 hover:bg-background transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add your first language
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <StatusIndicator
              isTranslating={isTranslating}
              isSpeaking={isSpeaking}
              isStreaming={isStreaming}
              isCorrectingGrammar={isCorrectingGrammar}
            />

            <QuickTips />

            <AppFooter />
          </div>
        </>
      )}
    </div>
  );
}

export const VoiceTranslator = dynamic(
  () => Promise.resolve(VoiceTranslatorComponent),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    ),
  }
);
