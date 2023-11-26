import UserInfo from "../types/User";
import handleApiRes from "./apiResHandler";

const apiUri = import.meta.env.VITE_BASE_URI;


async function loginUser(email: string, password: string): Promise<UserInfo> {
  const response = await fetch(`${apiUri}/api/user/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await handleApiRes(response);
}

async function logoutUser(): Promise<{ message: string }> {
  const response = await fetch(`${apiUri}/api/user/auth/logout`, { method: "POST" });
  return await handleApiRes(response);
}

async function getUser(): Promise<UserInfo> {
  const response = await fetch(`${apiUri}/api/user/`);
  return await handleApiRes(response);
}

async function register(email: string, password: string): Promise<UserInfo> {
  const response = await fetch(`${apiUri}/api/user/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await handleApiRes(response);
}


export default { loginUser, logoutUser, getUser, register }