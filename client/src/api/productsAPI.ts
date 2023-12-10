import {Product, Category} from "../types/Product";
import handleApiRes from "./apiResHandler";

const apiUri = import.meta.env.VITE_API_URI;

async function getAllProducts(): Promise<Product[]> { 
  const response = await fetch(`${apiUri}/inventory`,{
    headers:{
      "authorization": JSON.stringify(localStorage.getItem('erp_token'))
    }
  });
  return await handleApiRes(response);
}

async function getCategories(): Promise<Category[]> { 
  const response = await fetch(`${apiUri}/shopInventory/categories`);
  return await handleApiRes(response);
}

async function getProduct(pid: string): Promise<Product> {
  const response = await fetch(`${apiUri}/inventory/${pid}`,{
    headers:{
      "authorization": JSON.stringify(localStorage.getItem('erp_token'))
    }
  });
  return await handleApiRes(response);
}

async function updateProduct(product: Product, pid: string): Promise<Product> {
  
  const response = await fetch(`${apiUri}/inventory/${pid}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers:{ 
      "authorization": JSON.stringify(localStorage.getItem('erp_token')),
      "Content-Type": "application/json"
    }
  });
  return await handleApiRes(response);
}

async function deleteProduct(pid: string): Promise<Object> {
  const response = await fetch(`${apiUri}/inventory/${pid}`, {
    method: 'DELETE',
    headers:{ "authorization": JSON.stringify(localStorage.getItem('erp_token'))}
  });
  return await handleApiRes(response);
}

async function addnewProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${apiUri}/inventory/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "authorization": JSON.stringify(localStorage.getItem('erp_token'))
    },
    body: JSON.stringify(product),
  });

  return await handleApiRes(response);
}

export default { getAllProducts, getProduct, updateProduct, deleteProduct, addnewProduct, getCategories }