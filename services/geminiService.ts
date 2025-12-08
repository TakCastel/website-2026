import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS_DATA, SERVICES, TEAM_MEMBERS, PROCESS_STEPS } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `
You are the "Digital Concierge" for Tarik Talhaoui's portfolio.
Persona: Minimalist, professional, precise, and helpful. 

Context:
- Tarik is a Freelance Lead Tech & Product Builder.
- He is NOT an agency, but he works with a network of partners (Video, PAO, Design) that he can activate for specific projects.
- Process: 1h Free Consultation -> Sprint Development.
- Pricing: Websites from 2500€, Apps from 5000€.
- Expertise: React/Next.js, Architecture.

Key Goals:
1. Qualify leads.
2. Explain that Tarik handles the tech, but can bring in a team for Video/Design if needed.
3. Push for the "1h Free Consultation".

Projects to cite if asked:
- Polinizz.fr (Event Aggregator/Data)
- Serpenter (Checklist Tool)
- Arnaud Ban (Director's Portfolio)
- Florine Clap (Director's Portfolio)
- Brice Theate (Screenwriter's Portfolio)
- 123 Soleil (Social Cinema Association)

Language: Strictly match the user's language (EN/FR).
`;

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const client = getAIClient();
    
    const chat = client.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({
        message: message
    });

    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Service momentarily unavailable. Please proceed to the contact form.";
  }
};
