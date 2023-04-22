import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [productIdea, setProductIdea] = useState('');
  const [userPersonas, setUserPersonas] = useState(['', '', '']);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/product',
      query: {
        productIdea,
        userPersona1: userPersonas[0],
        userPersona2: userPersonas[1],
        userPersona3: userPersonas[2],
      },
    });
  };

  const handleUserPersonaChange = (index: number, value: string) => {
    const newUserPersonas = [...userPersonas];
    newUserPersonas[index] = value;
    setUserPersonas(newUserPersonas);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="productIdea" className="block mb-2 text-sm font-medium text-gray-600">
                  Product Idea
                </label>
                <input
                  type="text"
                  id="productIdea"
                  value={productIdea}
                  onChange={(e) => setProductIdea(e.target.value)}
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Enter your product idea"
                />
              </div>

            {[0, 1, 2].map((i) => (
                <div key={i} className="mb-4">
                  <label htmlFor={`userPersona${i + 1}`} className="block mb-2 text-sm font-medium text-gray-600">
                    User Persona {i + 1}
                  </label>
                  <input
                    type="text"
                    id={`userPersona${i + 1}`}
                    value={userPersonas[i]}
                    onChange={(e) => handleUserPersonaChange(i, e.target.value)}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder={`Enter user persona ${i + 1}`}
                  />
                </div>
              ))}

                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Generate Insights
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
