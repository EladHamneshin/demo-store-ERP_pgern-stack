import UserInfo from "../types/User";
import handleApiRes from "./apiResHandler";

const apiUri = import.meta.env.VITE_API_URI;


async function loginUser(email: string, password: string): Promise<UserInfo> {
  const response = await fetch(`${apiUri}/user/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });  
  console.log(response);
  
  return await handleApiRes(response);
}

async function logoutUser(): Promise<{ message: string }> {
  const response = await fetch(`${apiUri}/user/auth/logout`, {
    method: "POST",
    credentials: 'same-origin'
  });
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
    body: JSON.stringify({ email, password }),
    credentials: 'same-origin'
  });
  
  return await handleApiRes(response);
}


export default { loginUser, logoutUser, getUser, register }