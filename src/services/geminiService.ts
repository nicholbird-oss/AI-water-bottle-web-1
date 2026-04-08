import { GoogleGenAI } from "@google/genai";

export const generateBottleImage = async (color: string): Promise<string> => {
  // Create a new instance right before the call as per guidelines for paid models
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  const prompt = `A professional, high-end product photograph of a ${color.toLowerCase()}, sleek, minimalist stainless steel water bottle. Studio lighting, clean white background, 4k resolution, sharp focus, premium metal texture.`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    });

    // Note: Standard Gemini models return text. Image generation usually requires Imagen models.
    const candidate = response.candidates?.[0];
    for (const part of candidate?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("This model does not support direct image generation. Please use the provided product images.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const hasApiKey = async (): Promise<boolean> => {
  if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return false;
};

export const openApiKeyDialog = async (): Promise<void> => {
  if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
    await (window as any).aistudio.openSelectKey();
  }
};
