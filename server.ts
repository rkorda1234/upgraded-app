import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Warning: GEMINI_API_KEY environment variable is not defined.");
}

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API chat endpoint using recommended @google/genai SDK
app.post("/api/chat", async (req: express.Request, res: express.Response) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request. 'messages' array is required." });
      return;
    }

    if (!ai) {
      res.status(503).json({ 
        error: "AI Service is not configured. Please set GEMINI_API_KEY in Secrets." 
      });
      return;
    }

    // Format chat history for @google/genai generateContent API
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content || "" }]
    }));

    const systemInstruction = 
      "You are Upgraded AI, an elegant digital concierge for Upgraded Real Estate. " +
      "Upgraded is a modern technology company transforming professional real estate education, not a traditional real estate school. " +
      "Our brand tagline is 'Where Modern Agents Upgrade Themselves.' " +
      "We offer premium Florida Licensing Education (63-Hour Sales Associate Pre-License, 14-Hour Continuing Education, 45-Hour Post-License) " +
      "and cutting-edge Professional Development (AI for Real Estate Professionals, Marketing & Business Growth, Business Planning). " +
      "Your tone must be highly premium, minimalist, elegant, future-focused, trustworthy, and intelligent. " +
      "Keep responses relatively short, highly structured, clean, and inspiring. Guide the user to explore our learning paths, licensing education, or professional development programs.";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ 
      content: response.text || "I'm sorry, I couldn't generate a response." 
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred during generation." });
  }
});

// Set up Vite middleware or serve static files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
