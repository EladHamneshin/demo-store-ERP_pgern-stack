import UserInfo from "../types/User";
import { BASE_URL } from "./api";
import handleApiRes from "./apiResHandler";

const apiUri = BASE_URL;


async function loginUser(email: string, password: string): Promise<UserInfo> {
  const response = await fetch(`${apiUri}/user/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });  
  
  return await handleApiRes(response);
}

async function logoutUser(): Promise<{ message: string }> {
  const response = await fetch(`${apiUri}/user/auth/logout`, {
    method: "POST"
  });
  localStorage.setItem('erp_token','')
  return await handleApiRes(response);
}

async function getUser(): Promise<UserInfo> {
  const response = await fetch(`${apiUri}/user/`);
  return await handleApiRes(response);
}

async function register(email: string, password: string): Promise<UserInfo> {
  const response = await fetch(`${apiUri}/user/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  });
  
  return await handleApiRes(response);
}


export default { loginUser, logoutUser, getUser, register }