import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatWithGemini = async (message: string, apiKey: string): Promise<string> => {
  if (!apiKey) {
    return "Please enter your Gemini API Key in the settings to chat with me!";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error chatting with Gemini:", error);
    return "Sorry, I encountered an error connecting to the AI. Please check your API key and try again.";
  }
};
