
import { GoogleGenAI, Type } from "@google/genai";
import { type Character } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const characterSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "A unique and evocative fantasy name for the character."
    },
    characterClass: {
      type: Type.STRING,
      description: "The character's class, chosen from the provided list."
    },
    health: {
      type: Type.INTEGER,
      description: "The character's health points, typically between 70 and 150. Warriors and Paladins should have higher health."
    },
    mana: {
      type: Type.INTEGER,
      description: "The character's mana points, typically between 50 and 150. Mages and Sorcerers should have higher mana."
    },
    strength: {
      type: Type.INTEGER,
      description: "The character's strength stat, typically between 10 and 50. Warriors and Rogues should have higher strength."
    }
  },
  required: ['name', 'characterClass', 'health', 'mana', 'strength'],
};

export const generateCharacter = async (): Promise<Omit<Character, 'portraitUrl' | 'backstory'>> => {
  try {
    const prompt = `
      Generate a single random fantasy character with a name, class, and stats (Health, Mana, Strength).
      The class must be one of the following: Warrior, Mage, Rogue, Cleric, Ranger, Paladin, Druid, or Sorcerer.
      Distribute the stats logically based on the class.
      Provide the output in a structured JSON format.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: characterSchema,
      },
    });
    
    const responseText = response.text;
    if (!responseText) {
        throw new Error("Received an empty response from the API.");
    }

    const cleanedText = responseText.trim().replace(/^```json\s*|```\s*$/g, '');
    const characterData = JSON.parse(cleanedText);

    if (!characterData.name || !characterData.characterClass) {
        throw new Error("Invalid character data structure received from API.");
    }
    
    return characterData;

  } catch (error) {
    console.error("Error generating character:", error);
    throw new Error("Failed to generate character. The model may be unavailable or the API key is invalid.");
  }
};

export const generateCharacterPortrait = async (character: Character): Promise<string> => {
  try {
    const prompt = `A cartoon, video game style digital painting portrait of ${character.name}, the ${character.characterClass}. High quality, fantasy art, vibrant colors, character centered.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error generating character portrait:", error);
    throw new Error("Failed to generate portrait. The model may be busy or unavailable.");
  }
};

export const generateCharacterBackstory = async (character: Character): Promise<string> => {
  try {
    const prompt = `Generate a short, epic, one-to-two-sentence fantasy backstory for a character named ${character.name}, who is a ${character.characterClass}.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    const backstory = response.text;
    if (!backstory) {
        throw new Error("Received an empty backstory from the API.");
    }
    
    return backstory.trim();

  } catch (error) {
    console.error("Error generating backstory:", error);
    throw new Error("Failed to generate backstory. The model may be unavailable.");
  }
};
