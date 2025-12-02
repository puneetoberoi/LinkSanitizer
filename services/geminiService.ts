import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { AiAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzePrivacyRisk = async (removedParams: string[], domain: string): Promise<AiAnalysis> => {
  if (removedParams.length === 0) {
    return {
      riskLevel: 'Low',
      explanation: 'No obvious tracking parameters were found in this link.',
      dataExposed: []
    };
  }

  try {
    const modelId = 'gemini-2.5-flash';
    
    const prompt = `
      Analyze these URL parameters removed from a link to ${domain}: ${removedParams.join(', ')}.
      Explain what kind of data is being tracked (e.g., user source, campaign ID, personal click ID).
      Assess the privacy risk.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            explanation: { type: Type.STRING },
            dataExposed: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ['riskLevel', 'explanation', 'dataExposed']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AiAnalysis;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback if AI fails
    return {
      riskLevel: 'Medium',
      explanation: `We removed ${removedParams.length} parameters including ${removedParams[0]}. These are typically used for cross-site tracking.`,
      dataExposed: ['Click Source', 'Campaign Data']
    };
  }
};