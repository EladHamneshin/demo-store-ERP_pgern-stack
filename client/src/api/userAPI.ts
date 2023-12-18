import { gql } from 'graphql-request';
import UserInfo from "../types/User";
import handleApiRes from "./newAPIhandler";

const apiUri = import.meta.env.VITE_API_URI;

async function loginUser(email: string, password: string): Promise<UserInfo> {
  const mutation = gql`
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        id
        email
        token
      }
    }
  `;

  const variables = {
    email,
    password,
  };

  try {
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });
    const data = await handleApiRes(response);
    localStorage.setItem('erp_token', data.loginUser.token);
    return data;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to login user: ${(error as Error).message}`);
  }
}

async function logoutUser(): Promise<{ message: string }> {
  localStorage.setItem('erp_token', '');
  return { message: 'successfuly logged out' };
}

async function getUser(id: string): Promise<UserInfo> {
  const query = gql`
    query GetUser($id: ID!) {
      getUser(id: $id) {
        id
        email
        # Add other fields as needed
      }
    }
  `;

  const variables = {
    id,
  };

  try {
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const data = await handleApiRes(response);
    return data;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to fetch user: ${(error as Error).message}`);
  }
}


async function register(email: string, password: string): Promise<UserInfo> {
  const mutation = gql`
    mutation RegisterUser($email: String!, $password: String!) {
      registerUser(email: $email, password: $password) {
        id
        email
        # Add other fields as needed
      }
    }
  `;

  const variables = {
    email,
    password,
  };

  try {
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });
    const data = await handleApiRes(response);
    return data;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to register user: ${(error as Error).message}`);
  }
}


export default { loginUser, logoutUser, getUser, register }