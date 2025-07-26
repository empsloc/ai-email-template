// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  
 
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
    const config = {
        responseMimeType:"application/json"
    };
    const model = 'gemini-2.0-flash-lite';
    export async function generateEmailTemplate(prompt: string) {
    const contents = [
      
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
  
    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });
    
      let fullResponse = '';
      for await (const chunk of response) {
        if (chunk.text) {
          fullResponse += chunk.text;
        }
      }
    
      return fullResponse;
    }


  