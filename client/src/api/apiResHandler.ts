export const handleApiRes = async (res: Response) => {
  const apiUri = import.meta.env.VITE_API_URI;  
  if (!apiUri) throw new Error('Please provide a valid API URI in the config file'); 
  const data = await res.json();
  
  if (!res.ok)     
    throw new Error(data.message);
  return data;
}

export default handleApiRes;