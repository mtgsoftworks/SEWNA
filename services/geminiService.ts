import { GoogleGenerativeAI } from "@google/generative-ai";
import { DesignBrief } from '../types';

let cachedClient: GoogleGenerativeAI | null = null;
let cachedApiKey: string | null = null;

const resolveApiKey = (): string => {
  const rawKey = import.meta.env.VITE_GEMINI_API_KEY ?? '';
  return rawKey.trim();
};

// Check if API key is available
const isApiKeyAvailable = () => {
  return resolveApiKey().length > 0;
};

const getGeminiClient = () => {
  const apiKey = resolveApiKey();

  if (!apiKey) {
    throw new Error("API key is not configured. Please add your Gemini API key to continue.");
  }

  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedClient = new GoogleGenerativeAI(apiKey);
    cachedApiKey = apiKey;
  }

  return cachedClient;
};

const fileToGenerativePart = async (file: File) => {
  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size exceeds 10MB limit. Please choose a smaller image.");
  }

  // Validate file type
  if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
    throw new Error("Invalid file type. Please upload a JPEG, PNG, or WebP image.");
  }

  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve((reader.result as string).split(',')[1]);
      } else {
        resolve("");
      }
    };
    reader.readAsDataURL(file);
  });
  const data = await base64EncodedDataPromise;
  return {
    inlineData: {
      data,
      mimeType: file.type,
    },
  };
};

const designBriefSchema = {
  type: "OBJECT" as const,
  properties: {
    style: { type: "STRING" as const, description: "e.g., 'Minimalist', 'Bohemian', 'Classic'" },
    garmentType: { type: "STRING" as const, description: "The type of clothing, e.g., 'A-line dress', 'Wide-leg trousers'" },
    keyFeatures: { 
      type: "ARRAY" as const, 
      items: { type: "STRING" as const },
      description: "Distinctive details, e.g., 'Puff sleeves', 'Asymmetrical hemline'" 
    },
    suggestedFabrics: { 
      type: "ARRAY" as const, 
      items: { type: "STRING" as const },
      description: "Suitable fabrics, e.g., 'Silk', 'Linen', 'Cotton'"
    },
    occasion: { type: "STRING" as const, description: "e.g., 'Casual outing', 'Formal event', 'Summer wedding'" },
    summary: { type: "STRING" as const, description: "A one-paragraph summary of design concept." },
  },
  required: ['style', 'garmentType', 'keyFeatures', 'suggestedFabrics', 'occasion', 'summary']
};

export const generateDesignBriefFromImage = async (
  imageFile: File,
  userNotes: string
): Promise<DesignBrief> => {
  // Check if API key is available
  if (!isApiKeyAvailable()) {
    throw new Error("API key is not configured. Please add your Gemini API key to continue.");
  }

  try {
    const imagePart = await fileToGenerativePart(imageFile);
    
    const textPart = {
      text: `Analyze the provided image of an outfit and the user's notes to create a detailed design brief. Be creative but ground your analysis in the visual evidence. User notes: "${userNotes || 'No additional notes provided.'}"`
    };

    const response = await getGeminiClient().getGenerativeModel({
      model: 'gemini-2.5-flash',
    }).generateContent({
      contents: [
        {
          role: "user",
          parts: [imagePart, textPart]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: designBriefSchema
      }
    });

    const jsonString = response.response.text();
    const parsedJson = JSON.parse(jsonString);

    // Validate and sanitize the parsed JSON to prevent rendering errors from unexpected object types.
    const validatedBrief: DesignBrief = {
      style: String(parsedJson.style ?? ''),
      garmentType: String(parsedJson.garmentType ?? ''),
      occasion: String(parsedJson.occasion ?? ''),
      summary: String(parsedJson.summary ?? ''),
      keyFeatures: Array.isArray(parsedJson.keyFeatures)
        ? parsedJson.keyFeatures.map((item: any) => String(item ?? ''))
        : [],
      suggestedFabrics: Array.isArray(parsedJson.suggestedFabrics)
        ? parsedJson.suggestedFabrics.map((item: any) => String(item ?? ''))
        : [],
    };

    return validatedBrief;

  } catch (error) {
    console.error("Error generating design brief:", error);
    
    // Provide more specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("API key is not configured. Please add your Gemini API key to continue.");
      } else if (error.message.includes("File size")) {
        throw new Error(error.message);
      } else if (error.message.includes("Invalid file type")) {
        throw new Error(error.message);
      } else if (error.message.includes("quota")) {
        throw new Error("API quota exceeded. Please try again later.");
      } else if (error.message.includes("safety")) {
        throw new Error("Image could not be processed due to safety guidelines. Please try a different image.");
      }
    }
    
    throw new Error("Failed to generate design brief. Please try again with a different image.");
  }
};

// Mock function for development without API key
export const generateMockDesignBrief = async (
  imageFile: File,
  userNotes: string
): Promise<DesignBrief> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a mock design brief based on file name or user notes
  const mockBriefs: DesignBrief[] = [
    {
      style: "Modern Minimalist",
      garmentType: "A-line Dress",
      keyFeatures: ["Clean lines", "Asymmetrical hem", "Subtle pleating"],
      suggestedFabrics: ["Silk crepe", "Organic cotton", "Tencel"],
      occasion: "Cocktail party",
      summary: "A sophisticated yet understated dress that combines modern minimalism with elegant details. Perfect for evening events where you want to make a subtle statement."
    },
    {
      style: "Bohemian Chic",
      garmentType: "Maxi Dress",
      keyFeatures: ["Flowing silhouette", "Embroidered details", "Bell sleeves"],
      suggestedFabrics: ["Rayon", "Linen blend", "Cotton voile"],
      occasion: "Summer festival",
      summary: "A free-spirited maxi dress that captures the essence of bohemian style with intricate embroidery and a flowing silhouette that moves with you."
    },
    {
      style: "Classic Elegance",
      garmentType: "Tailored Suit",
      keyFeatures: ["Structured shoulders", "Double-breasted", "Tapered trousers"],
      suggestedFabrics: ["Wool blend", "Silk lining", "Hemp fabric"],
      occasion: "Business meeting",
      summary: "A timeless tailored suit that exudes confidence and professionalism. The structured silhouette creates a powerful presence while maintaining comfort."
    }
  ];
  
  // Select a mock brief based on user notes or file name
  let selectedIndex = 0;
  if (userNotes.toLowerCase().includes("bohemian") || imageFile.name.toLowerCase().includes("boho")) {
    selectedIndex = 1;
  } else if (userNotes.toLowerCase().includes("suit") || imageFile.name.toLowerCase().includes("suit")) {
    selectedIndex = 2;
  }
  
  return mockBriefs[selectedIndex];
};
