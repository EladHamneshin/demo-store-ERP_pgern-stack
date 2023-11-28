import Product from "../types/Product";
import handleApiRes from "./apiResHandler";

const apiUri = import.meta.env.VITE_BASE_URI;

async function getAllProducts(): Promise<Product[]> { 
  const response = await fetch(`${apiUri}/api/inventory`);
  return await handleApiRes(response);
}

async function getProduct(pid: string): Promise<Product> {
  const response = await fetch(`${apiUri}/api/inventory/${pid}`, {credentials: 'same-origin'});
  return await handleApiRes(response);
}

async function updateProduct(product: Product, pid: string): Promise<Product> {
  const response = await fetch(`${apiUri}/api/inventory/${pid}`, {method: 'PUT', credentials: 'include',
  body: JSON.stringify(product)});
  return await handleApiRes(response);
}

async function deleteProduct(pid: string): Promise<Object> {
  const response = await fetch(`${apiUri}/api/inventory/${pid}`, {method: 'DELETE'});
  return await handleApiRes(response);
}

async function addnewProduct(pid: string): Promise<Product> {
  const response = await fetch(`${apiUri}/api/inventory/${pid}`, {method: 'POST'});
  return await handleApiRes(response);
}

export default { getAllProducts, getProduct, updateProduct, deleteProduct, addnewProduct }