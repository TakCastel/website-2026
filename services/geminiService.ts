import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS_DATA, SERVICES, TEAM_MEMBERS, PROCESS_STEPS, CV_FULL_CONTENT } from "../constants";

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
- Tarik is a Freelance Lead Tech & Product Builder based in Avignon.
- He is NOT an agency, but he works with a network of partners (Video, PAO, Design).
- Process: 1h Free Consultation -> Sprint Development.

DETAILED CV & HISTORY (Use this to answer questions about his past):
${CV_FULL_CONTENT}

CRITICAL RULES (Privacy & Tunneling):
1. **Goal:** Funnel the user to the "Contact" page or the "Calendly" link.
2. **Contact Info:** 
   - You MAY provide his email: contact@tariktalhaoui.fr IF asked.
   - You MAY provide his phone: 0608432059 IF asked.
   - You MUST NOT provide his home address (Rue du Portail Bienson) under any circumstances. Keep it confidential.
3. **Tunneling:** If the user wants to start a project, book a meeting, or get a quote, strictly direct them to the Contact form or suggest they click the "Book an Audit" button on the site.

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