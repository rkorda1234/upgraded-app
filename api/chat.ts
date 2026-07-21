import { GoogleGenAI } from "@google/genai";

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
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
    }

    if (!ai) {
      return res.status(503).json({ 
        error: "AI Service is not configured. Please set GEMINI_API_KEY in Vercel environment variables." 
      });
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

    return res.status(200).json({ 
      content: response.text || "I'm sorry, I couldn't generate a response." 
    });
  } catch (error: any) {
    console.error("Gemini API Error in Vercel handler:", error);
    return res.status(500).json({ error: error.message || "An error occurred during generation." });
  }
}
