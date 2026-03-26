import { GoogleGenAI, Type } from "@google/genai";

export async function generateBeerRecipe(persona: any) {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    페르소나 정보:
    - 성별/연령: ${persona.gender} / ${persona.ageGroup}
    - 현재 기분: ${persona.moodText} / 감정 태그: ${persona.emotionTags.join(', ')}
    - 동행자: ${persona.companion} / 장소: ${persona.location}
    - 맛 선호도: 쓴맛 ${persona.bitterness}/10, 단맛 ${persona.sweetness}/10, 과일향 ${persona.fruitiness}/10, 탄산 ${persona.carbonation}/10
    - 선호 도수: ${persona.abvPreference}
    - 선호 스타일: ${persona.beerStyle}
    - 추가 요청: ${persona.extraNote}

    위 페르소나를 바탕으로 20L 배치 기준 맥주 레시피를 JSON으로 생성해줘.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are a master craft brewer and sensory expert. 
        Your job is to translate a person's emotional state, life context, and taste preferences into a precise craft beer recipe.
        
        CRITICAL RULES:
        - ALL recipes must be calculated for exactly 20 liters (5.3 gallons) batch size. Never scale to other volumes.
        - Respond ONLY in valid JSON following the provided schema exactly. Do not omit the 'recipe' object.
        - Beer names must be in Korean (창의적이고 감성적인 한국어 이름).
        - Descriptions must be in Korean.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            beer_name: { type: Type.STRING },
            style: { type: Type.STRING },
            abv: { type: Type.NUMBER },
            ibu: { type: Type.NUMBER },
            srm: { type: Type.NUMBER },
            description: { type: Type.STRING },
            recipe: {
              type: Type.OBJECT,
              properties: {
                batch_size_liters: { type: Type.NUMBER },
                boil_time_min: { type: Type.NUMBER },
                mash_temp_celsius: { type: Type.NUMBER },
                og: { type: Type.NUMBER },
                fg: { type: Type.NUMBER },
                fermentables: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      amount_kg: { type: Type.NUMBER },
                      type: { type: Type.STRING },
                      description: { type: Type.STRING }
                    }
                  }
                },
                hops: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      amount_g: { type: Type.NUMBER },
                      alpha_acid_percent: { type: Type.NUMBER },
                      timing: { type: Type.STRING },
                      purpose: { type: Type.STRING }
                    }
                  }
                },
                yeast: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    lab: { type: Type.STRING },
                    attenuation_percent: { type: Type.NUMBER },
                    description: { type: Type.STRING }
                  }
                },
                brewing_steps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            },
            glass_type: { type: Type.STRING },
            color_hex: { type: Type.STRING },
            serving_temp_celsius: { type: Type.NUMBER },
            food_pairing: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("No response text from Gemini API.");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Recipe Generation Error:", error);
    throw error;
  }
}
