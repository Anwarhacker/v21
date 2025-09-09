"use client";

import { Globe, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AppFooter() {
  return (
    <footer className="mt-16 mb-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 rounded-2xl sm:rounded-3xl border border-primary/20 shadow-2xl backdrop-blur-sm">
        <div className="absolute inset-0 gradient-mesh opacity-10" />
        <div className="absolute top-0 left-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-12 h-12 sm:w-24 sm:h-24 bg-secondary/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative py-4 sm:py-8 px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-2xl animate-glow">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Voice Translator Teammmmmmm
              </h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed px-4">
              Connecting cultures and breaking language barriers with
              cutting-edge AI technology
            </p>
          </div>

          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-xl" />
            <div className="overflow-hidden py-4 px-2">
              <div className="flex flex-col sm:hidden items-center justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full border border-primary/20 text-xs">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary font-semibold">
                    Developers:
                  </span>
                  <span className="text-foreground">
                    Anwar Patel • Goussoddin • Pooja Pasarge • Shreya Reddy
                  </span>
                </span>
              </div>
              <div className="hidden sm:block marquee-container group">
                <div className="marquee-content">
                  <span className="text-sm font-medium tracking-wide flex items-center gap-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                      {/* <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> */}
                      <span className="text-primary font-semibold">
                        Developers:
                      </span>
                      <span className="text-foreground">
                        Anwar Patel • Goussoddin • Pooja Pasarge • Shreya Reddy
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                      <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      <span className="text-accent font-semibold">
                        Special Thanks:
                      </span>
                      <span className="text-foreground">
                        Open Source Community
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-primary/10">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="font-medium">© 2024 Voice Translator</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Open Source
                </span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span className="hover:text-primary transition-colors cursor-pointer">
                  MIT License
                </span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Privacy
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Badge
                variant="outline"
                className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors text-xs"
              >
                <Globe className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">25+ Languages</span>
                <span className="sm:hidden">25+</span>
              </Badge>
              <Badge
                variant="outline"
                className="bg-secondary/5 border-secondary/20 text-secondary hover:bg-secondary/10 transition-colors text-xs"
              >
                <Zap className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Real-time AI</span>
                <span className="sm:hidden">AI</span>
              </Badge>
              <Badge
                variant="outline"
                className="bg-accent/5 border-accent/20 text-accent hover:bg-accent/10 transition-colors text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline text-black">
                  Grammar Check
                </span>
                <span className="sm:hidden text-black">Grammar</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
