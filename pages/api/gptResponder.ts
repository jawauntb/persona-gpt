import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export async function getResponsesFromPersonas(inputText: string, productIdea: string, personas: string[]) {
  console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY}`); // log the value of the OPENAI_API_KEY environment variable
  const key = process.env.OPENAI_API_KEY;
  const chat = new ChatOpenAI({ openAIApiKey: key, temperature: 0.8 });

  const responses = await Promise.all(
    personas.map(async (persona) => {
      const response = await chat.call([
        new SystemChatMessage(`Persona: ${persona}\nProduct Idea: ${productIdea}`),
        new HumanChatMessage(inputText),
      ]);
      return response.text.trim();
    })
  );

  return responses;
}
