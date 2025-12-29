
import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { FileData, GroundingSource } from "../types";

// Note: In this environment, process.env.API_KEY is handled externally.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithMentor = async (
  message: string, 
  history: { role: 'user' | 'model'; parts: any[] }[] = [],
  file?: FileData,
  useDeepThink: boolean = false
) => {
  try {
    const ai = getAI();
    const parts: any[] = [{ text: message }];
    
    if (file) {
      parts.push({
        inlineData: {
          mimeType: file.mimeType,
          data: file.data
        }
      });
    }

    // Use Gemini 3 Pro for images or complex queries (Deep Think)
    const modelName = (file || useDeepThink) ? "gemini-3-pro-preview" : "gemini-3-flash-preview";
    
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.95,
      tools: [{ googleSearch: {} }],
    };

    // Apply thinking budget for Gemini 3 Pro
    if (modelName === "gemini-3-pro-preview") {
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history,
        { role: 'user', parts }
      ],
      config,
    });

    const text = response.text || "";
    
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          if (!sources.some(s => s.uri === chunk.web.uri)) {
            sources.push({
              title: chunk.web.title,
              uri: chunk.web.uri
            });
          }
        }
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "Oye, internet connectivity ya API ka thora masla hai. Ek bar phir try karein! Action lein, rukna nahi!", 
      sources: [] 
    };
  }
};

export const speakText = async (text: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say naturally and helpfully: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { inlineData: { data: base64Audio, mimeType } },
            { text: "Transcribe this audio message. Return only the transcription text, nothing else." }
          ]
        }
      ],
    });
    return response.text?.trim() || null;
  } catch (error) {
    console.error("Transcription Error:", error);
    return null;
  }
};

export const decodeBase64Audio = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const playPCM = async (uint8Array: Uint8Array) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const dataInt16 = new Int16Array(uint8Array.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
};
