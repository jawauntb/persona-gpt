import { useRouter } from 'next/router';
import { getResponsesFromPersonas } from './api/gptResponder';
import { useState } from 'react';
import { useClientSide } from '../utils/useClientSide';

export default function Product() {
  const router = useRouter();
  const isClient = useClientSide();

  const { productIdea, userPersona1, userPersona2, userPersona3 } = router.query ?? {};
  const [inputText, setInputText] = useState('');
  const [responses, setResponses] = useState([""]);
  const productIdeaString = productIdea as string;
  const userPersona1String = userPersona1 as string;
  const userPersona2String = userPersona2 as string;
  const userPersona3String = userPersona3 as string;
  const handleInputChange = (e: any) => setInputText(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const generatedResponses = await getResponsesFromPersonas(
      inputText,
      productIdeaString,
      [userPersona1String, userPersona2String, userPersona3String]
    );
    setResponses(generatedResponses);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Idea:</h2>
      <p className="text-gray-600 mb-8">{productIdea}</p>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Personas:</h2>
      <p className="text-gray-600 mb-2">{userPersona1}</p>
      <p className="text-gray-600 mb-2">{userPersona2}</p>
      <p className="text-gray-600 mb-8">{userPersona3}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="inputText" className="block text-gray-700">
            Enter a question, context, or scenario:
          </label>
          <input
            id="inputText"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button type="submit" className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">
          Submit
        </button>
      </form>

      <div className="mt-4">
        {responses.map((response, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium text-gray-800">Persona {index + 1} Response:</h3>
            <p className="text-gray-600">{response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
