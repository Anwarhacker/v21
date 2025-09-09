"use client";

import { Globe, Sparkles, Volume2, Languages } from "lucide-react";

export function AppHeader() {
  return (
    <div className="text-center py-8 sm:py-12 mb-8 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          {/* <Globe className="h-8 w-8 text-primary" /> */}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Real-Time Voice Translator
        </h1>
      </div>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 text-balance">
        Break language barriers instantly with AI-powered real-time speech
        translation
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-up">
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Real-time Translation</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
          <Volume2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Voice Recognition</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
          <Languages className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">25+ Languages</span>
        </div>
      </div>
    </div>
  );
}
