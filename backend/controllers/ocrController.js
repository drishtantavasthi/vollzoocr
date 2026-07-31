import { GoogleGenerativeAI } from "@google/generative-ai";

const extractData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided." });
    }

    // Check both standard backend var and Vite frontend var for convenience
    const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: "Gemini API key is missing. Please add it to your .env file." });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const base64Data = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    
    const userInstructions = req.body.instructions || "";

    const basePrompt = `
      Analyze this document and extract information.
      Return the results STRICTLY as a flat, valid JSON object without any Markdown formatting (no \`\`\`json).
      
      Do not use nested objects. Flatten everything into top-level key-value string pairs. Do not include any explanation.
    `;

    const instructionPrompt = userInstructions 
      ? `\n\nUSER SPECIFIC INSTRUCTIONS: Extract ONLY the following information based on this prompt: "${userInstructions}". Try your best to adhere to the labels requested.`
      : `\n\nIdentify all the labels or fields implicitly or explicitly in the document and extract their corresponding values. Extract ALL key information present.`;

    const finalPrompt = basePrompt + instructionPrompt;

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ];

    const result = await model.generateContent([finalPrompt, ...imageParts]);
    const responseText = result.response.text();

    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    res.status(200).json({ success: true, data: parsedData });
  } catch (error) {
    console.error("OCR Controller Error:", error);
    res.status(500).json({ error: "Failed to extract data from document.", details: error.message });
  }
};

export { extractData };
