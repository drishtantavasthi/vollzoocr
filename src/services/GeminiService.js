import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export const GeminiService = {
  isAvailable() {
    return !!API_KEY;
  },

  async extractDataFromDocuments(files, userInstructions = "") {
    if (!genAI) {
      throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
    }

    const promptParts = await Promise.all(files.map(async (file) => {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      return [
        { text: `--- Document Name: ${file.name} ---` },
        {
          inlineData: {
            data: base64Data,
            mimeType: file.type, // e.g. 'application/pdf' or 'image/jpeg'
          },
        }
      ];
    }));

    const flatPromptParts = promptParts.flat();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const basePrompt = userInstructions
      ? `
        Analyze this document or set of documents and extract information.
        Return the results STRICTLY as a flat, valid JSON object without any Markdown formatting (no \`\`\`json).
        
        Do not use nested objects. Flatten everything into top-level key-value string pairs. Do not include any explanation.
        Combine knowledge from all provided documents if multiple are present.
      `
      : `
        Analyze these documents.
        Return the results STRICTLY as a valid JSON object without any Markdown formatting (no \`\`\`json).
        
        Structure the JSON so that the top-level keys are the EXACT Document Names provided above, and the values are flat JSON objects containing the extracted key-value pairs for that respective document. Do not deeply nest objects inside the document keys.
      `;

    const instructionPrompt = userInstructions 
      ? `\n\nUSER SPECIFIC INSTRUCTIONS: Extract ONLY the following information based on this prompt: "${userInstructions}". Try your best to adhere to the labels requested.`
      : `\n\nIdentify all the labels or fields implicitly or explicitly in each document and extract their corresponding values.`;

    const finalPrompt = basePrompt + instructionPrompt;

    try {
      const result = await model.generateContent([finalPrompt, ...flatPromptParts]);
      const responseText = result.response.text();

      // Clean up potential markdown formatting if the model still outputs it
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error("OCR Extraction Error:", error);
      throw new Error(`Failed to extract data: ${error.message}`);
    }
  }
};
