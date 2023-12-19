import { gql } from 'graphql-request';
import {Product, Category} from "../types/Product";
import handleApiRes from "./newAPIhandler";
import {handleApiRes as oldHandleApiRes} from "./apiResHandler";

const apiUri = import.meta.env.VITE_API_URI;

async function getAllProducts(): Promise<Product[]> { 
  const query = gql`
  query{
    getAllProducts {
      id
      name
      saleprice
      quantity
      description
      category
      discount
      rating
      clicked
      image {
        alt
        url
      }
      coordinate {
        latitude
        longitude
      }
      tags
      isforsale
      costprice
      supplier
    }
  }
  `;

  try {
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": JSON.stringify(localStorage.getItem('erp_token'))
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query,
      }),
    });
     const data = await handleApiRes(response);
     
    return data.getAllProducts;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to get products: ${(error as Error).message}`);
  }
}

async function getCategories(): Promise<Category[]> { 
  const response = await fetch(`${apiUri}/shopInventory/categories`);
  return await oldHandleApiRes(response);
}

async function getProduct(pid: string): Promise<Product> {
  const query = gql`
  query($getProductByIdId: String){
    getProductById(id: $getProductByIdId) {
      id
      name
      saleprice
      quantity
      description
      category
      discount
      rating
      clicked
      image {
        url
        alt
      }
      coordinate {
        longitude
        latitude
      }
      tags
      isforsale
      costprice
      supplier
    }
  }
  `;

  const variables = {
    "getProductByIdId" : pid
  };

  try {
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": JSON.stringify(localStorage.getItem('erp_token'))
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query: query,
        variables
      }),
    });
     const data = await handleApiRes(response);         
     
    return data.getProductById;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to get product: ${(error as Error).message}`);
  }
}

async function updateProduct(product: Omit<Product,"id">, pid: string): Promise<Product> {
  const mutation = gql`
  mutation UpdateProduct($updateInput: ProductInput!, $updateProductByIdId: String) {
    updateProductById(updateInput: $updateInput, id: $updateProductByIdId) {
      id
      name
      saleprice
      quantity
      description
      category
      discount
      rating
      clicked
      image {
        url
        alt
      }
      coordinate {
        longitude
        latitude
      }
      tags
      isforsale
      costprice
      supplier
    }
  }
`;

const variables = {
  updateInput: product,
  updateProductByIdId: pid
};


  try {    
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify(localStorage.getItem('erp_token'))
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query: mutation,
        variables
      }),
    });
    
     const data = await handleApiRes(response);       
     
    return data.updateProductById;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to update product: ${(error as Error).message}`);
  }
}

async function deleteProduct(pid: string): Promise<Object> {
  const mutation = gql`
  mutation DeleteProductById($deleteProductByIdId: String) {
    deleteProductById(id: $deleteProductByIdId)
  }
`;

const variables = {
  deleteProductByIdId: pid
};


  try {    
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify(localStorage.getItem('erp_token'))
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query: mutation,
        variables
      }),
    });
    
     const data = await handleApiRes(response);         
     
    return data;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to delete poduct: ${(error as Error).message}`);
  }
}

async function addnewProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const mutation = gql`
  mutation AddNewProduct($productInput: ProductInput!) {
    addNewProduct(productInput: $productInput) {
      id
      name
      saleprice
      quantity
      description
      category
      discount
      rating
      clicked
      image {
        url
        alt
      }
      coordinate {
        longitude
        latitude
      }
      tags
      isforsale
      costprice
      supplier
    }
  }
`;

const variables = {
  productInput: product,
};


  try {        
    const response = await fetch(`${apiUri}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify(localStorage.getItem('erp_token'))
        // Add any other headers as needed, e.g., authorization headers
      },
      body: JSON.stringify({
        query: mutation,
        variables
      }),
    });
    
     const data = await handleApiRes(response);          
     
    return data.addNewProduct;
  } catch (error) {
    // Handle network errors or other exceptions
    throw new Error(`Failed to add product: ${(error as Error).message}`);
  }
}

export default { getAllProducts, getProduct, updateProduct, deleteProduct, addnewProduct, getCategories }