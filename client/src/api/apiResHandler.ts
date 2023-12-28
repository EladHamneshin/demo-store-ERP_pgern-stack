import { BASE_URL } from "./api";

const handleApiRes = async (res: Response) => {
  const apiUri = BASE_URL;  
  if (!apiUri) throw new Error('Please provide a valid API URI in the config file'); 
  const data = await res.json();
  
  if (!res.ok)     
    throw new Error(data.message);
  return data;
}

export default handleApiRes;