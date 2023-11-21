import query from "../utils/qearyDB";

type ProductToUpdate = {
  productId: string;
  requiredQuantity: number;
  action: string;
};

export const dalAllData = async (queryString: string) => {  
  const {rows}: any = await query(queryString);
  return rows;
};


export const getProductById = async (queryString: string) => {
  const {rows}: any = await query(queryString);
  return rows
};


export async function updateInventory(products: ProductToUpdate[]) {
  for (const product of products) {
    // let queryString = 
    // `UPDATE products
    //  SET quantity = quantity - ${product.requiredQuantity}
    //  WHERE id = 1;`
     if (product.action === 'inc') {
      let queryString = 
      `UPDATE products
       SET quantity = quantity + ${product.requiredQuantity}
       WHERE id = ${product.productId};`
     }
     else if  (product.action === 'dec') {
      let queryString = 
      `UPDATE products
       SET quantity = quantity - ${product.requiredQuantity}
       WHERE id = ${product.productId};`
     }
  }
  
  console.log('updateInventoryDal');

  return 'updateInventoryDal';
}
