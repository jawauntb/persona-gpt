import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [productIdea, setProductIdea] = useState('');
  const [userPersona1, setUserPersona1] = useState('');
  const [userPersona2, setUserPersona2] = useState('');
  const [userPersona3, setUserPersona3] = useState('');

 
    const router = useRouter();

    const handleSubmit = (e:any) => {
      e.preventDefault();
      // Process the inputs here or send them to your backend

      router.push({
        pathname: '/product',
        query: {
          productIdea,
          userPersona1,
          userPersona2,
          userPersona3,
        },
      });
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

              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-4">
                  <label htmlFor={`userPersona${i}`} className="block mb-2 text-sm font-medium text-gray-600">
                    User Persona {i}
                  </label>
                  <input
                    type="text"
                    id={`userPersona${i}`}
                    value={eval(`userPersona${i}`)}
                    onChange={(e) => eval(`setUserPersona${i}`)(e.target.value)}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder={`Enter user persona ${i}`}
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
