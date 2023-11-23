import axios, { AxiosResponse } from 'axios';
import UserInfo from "../types/User";
import { handleApiRes, handleApiError } from "./apiResHandler";

const apiUri = import.meta.env.VITE_API_URI;
console.log(apiUri);

async function loginUser(email: string, password: string): Promise<UserInfo> {
  try {
    const response: AxiosResponse<UserInfo> = await axios.post(`${apiUri}/api/user/auth/login`, {
      email,
      password,
    });
    return handleApiRes(response);
  } catch (error) {
    if (axios.isAxiosError(error)){
      handleApiError(error)
    }
  }
}

async function logoutUser(): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.post(`${apiUri}/api/user/auth/logout`);
  return handleApiRes(response);
}

async function getUser(): Promise<UserInfo> {
  const response: AxiosResponse<UserInfo> = await axios.get(`${apiUri}/api/user/`);
  return handleApiRes(response);
}

async function register(email: string, password: string): Promise<UserInfo> {

  const response: AxiosResponse<UserInfo> = await axios.post(`${apiUri}/api/user/register/`, {
    email,
    password,
  });
  return handleApiRes(response);
}

export default { loginUser, logoutUser, getUser, register };
