const handleApiRes = async (response: Response) => {
  const apiUri = import.meta.env.VITE_API_URI;

  if (!apiUri) {
    throw new Error('Please provide a valid API URI in the config file');
  }
  const data = await response.json();
  if (response.ok) {
    return data.data;
  } else {
    // Handle errors from the GraphQL server
    throw new Error(data.errors?.[0]?.message || 'GraphQL request failed');
  }
}

export default handleApiRes;