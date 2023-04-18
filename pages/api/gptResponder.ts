export async function getResponsesFromPersonas(endpoint:string, apiKey:string, inputText:string, productIdea:string, personas:string[]) {
  const payload = {
    productIdea,
    personas,
    inputText,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  };

  const responses = await Promise.all(
    personas.map(async () => {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();
      return data.response;
    })
  );

  return responses;
}
