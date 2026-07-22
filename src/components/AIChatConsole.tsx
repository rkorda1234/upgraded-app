import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mic, MicOff, Volume2, VolumeX, Sparkles, X, RotateCcw, Bot, User, CornerDownLeft } from "lucide-react";
import { Message } from "../types";

// Setup Speech Recognition types for TypeScript
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

interface WebkitWindow extends Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

export default function AIChatConsole({ onClose, initialPrompt }: { onClose?: () => void; initialPrompt?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      content: "Hello! I am Upgraded AI, your modern real estate education assistant. Ask me anything about our Florida licensing programs, professional development, or the real estate industry in general.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const sentInitialPromptsRef = useRef<Set<string>>(new Set());

  // Suggestions for quick prompting
  const suggestions = [
    "Tell me about the 63-Hour pre-license",
    "How does Upgraded AI course work?",
    "Florida CE renewal requirements",
    "Real estate marketing trends"
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const speechWindow = window as unknown as WebkitWindow;
    const SpeechRec = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSendMessage(transcript);
        }
      };

      rec.onerror = (err: any) => {
        console.error("Speech recognition error:", err);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, []);

  // Auto trigger initial prompt when modal opens
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() && !sentInitialPromptsRef.current.has(initialPrompt)) {
      sentInitialPromptsRef.current.add(initialPrompt);
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle Text-to-Speech response if unmuted
  const speakResponse = (text: string) => {
    if (isMuted) return;
    
    // Stop any existing speech
    window.speechSynthesis.cancel();
    
    const cleanText = text.replace(/[*_#`\-]/g, ""); // Clean markdown characters
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Find a premium-sounding voice if possible
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural") || v.lang.startsWith("en"));
    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }
    
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: chatHistory })
      });

      const data = await res.json();
      
      if (res.ok) {
        const modelMessage: Message = {
          id: Math.random().toString(),
          role: "model",
          content: data.content,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, modelMessage]);
        
        // Trigger speech if unmuted
        speakResponse(data.content);
      } else {
        throw new Error(data.error || "Failed to generate response.");
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "model",
          content: `Connection issue: ${err.message || "I had trouble connecting to my servers. Please try again."}`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported on your browser. Try using Google Chrome.");
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      window.speechSynthesis.cancel(); // Stop talking when user speaks
      recognition.start();
    }
  };

  const resetChat = () => {
    window.speechSynthesis.cancel();
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: "Hello! I am Upgraded AI, your modern real estate education assistant. Ask me anything about our Florida licensing programs, professional development, or the real estate industry in general.",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div id="ai-chat-console" className="flex flex-col h-[520px] bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl relative">
      {/* Console Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5 font-display">
              Upgraded AI Assistant
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
            </h4>
            <p className="text-[9px] text-gray-450 font-mono">MODEL: GEMINI-3.5-FLASH</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute/Unmute Text-to-Speech */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (!isMuted) window.speechSynthesis.cancel();
            }}
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
            className={`p-2 rounded-lg border transition-all ${
              isMuted 
                ? "border-gray-200 text-gray-400 hover:text-black hover:bg-gray-50" 
                : "bg-black text-white border-black"
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset button */}
          <button
            onClick={resetChat}
            title="Reset Chat"
            className="p-2 border border-gray-200 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-black rounded-lg hover:bg-gray-50 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Voice Mode Visualizer */}
      {isRecording && (
        <div className="bg-gray-50 px-6 py-2.5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="text-xs font-mono text-black font-semibold">Listening to user voice...</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-black rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-black rounded-full animate-pulse [animation-delay:0.2s]" />
            <span className="w-1 h-2 bg-black rounded-full animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>
      )}

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50 custom-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                m.role === "user" 
                  ? "bg-gray-150 border-gray-200 text-black" 
                  : "bg-black border-black text-white"
              }`}>
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className={`rounded-2xl p-4 text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-black text-white shadow-sm"
                  : "bg-gray-50 border border-gray-100 text-gray-800"
              }`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-black border-black text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-2xl p-4 bg-gray-50 border border-gray-100 text-gray-500 flex items-center gap-2">
                <span className="text-[11px] font-mono">Generating clarity</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0s]" />
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:0.3s]" />
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Grid */}
      {messages.length === 1 && !isLoading && (
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100">
          <p className="text-[9px] uppercase font-mono text-gray-400 tracking-wider mb-2 font-bold">Suggested Inquiries</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSendMessage(s)}
                className="text-left text-xs bg-white hover:bg-gray-50 text-gray-600 hover:text-black px-3 py-2 rounded-xl border border-gray-200 transition-all truncate font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-black transition-all">
          {/* Voice Mic Button */}
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-lg transition-all relative ${
              isRecording 
                ? "bg-red-500 text-white shadow" 
                : "text-gray-400 hover:text-black hover:bg-gray-50"
            }`}
            title="Speech Input (Voice Chat)"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder={isRecording ? "Listening..." : "Ask Upgraded AI..."}
            className="flex-1 bg-transparent border-0 text-black placeholder-gray-400 focus:ring-0 focus:outline-none text-xs px-2"
            disabled={isLoading || isRecording}
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className={`p-2 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? "bg-black text-white hover:bg-neutral-900"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between px-2 text-[9px] text-gray-400 font-mono">
          <span>{isMuted ? "TTS: Muted" : "TTS: Active (Speaking response)"}</span>
          <span className="flex items-center gap-1 font-semibold">
            Press Enter to Send <CornerDownLeft className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
