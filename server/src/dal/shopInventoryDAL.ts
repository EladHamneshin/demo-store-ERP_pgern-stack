import query from "../utils/qearyDB";


export const getAllData = async (queryString: string) => {  
  const {rows}: any = await query(queryString); // edit rows type
  return rows;
};


export const getProductById = async (queryString: string) => {
  const {rows}: any = await query(queryString); // edit rows type
  return rows
};

export async function checkQuantity(checkQuery: string) {
  const {rows}: any = await query(checkQuery); // edit rows type
  const [{quantity}] = rows;
  return quantity
}

export async function updateInventory(queryString: string) {
  const message = await query(queryString);
  return message?.command;
}




