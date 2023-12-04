import {Product} from "../types/Product";
import handleApiRes from "./apiResHandler";

const apiUri = import.meta.env.VITE_API_URI;

async function getAllProducts(): Promise<Product[]> { 
  const response = await fetch(`${apiUri}/inventory`);
  return await handleApiRes(response);
}

async function getProduct(pid: string): Promise<Product> {
  const response = await fetch(`${apiUri}/inventory/${pid}`);
  return await handleApiRes(response);
}

async function updateProduct(product: Product, pid: string): Promise<Product> {
  const response = await fetch(`${apiUri}/inventory/${pid}`, {method: 'PUT',
  body: JSON.stringify(product)});
  return await handleApiRes(response);
}

async function deleteProduct(pid: string): Promise<Object> {
  const response = await fetch(`${apiUri}/inventory/${pid}`, {method: 'DELETE'});
  return await handleApiRes(response);
}

async function addnewProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${apiUri}/inventory/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await handleApiRes(response);
}

export default { getAllProducts, getProduct, updateProduct, deleteProduct, addnewProduct }