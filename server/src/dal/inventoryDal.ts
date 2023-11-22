type ProductToUpdate = {
  productId: string;
  requiredQuantity: number;
};

export const dalAllData = async (searchParam: string | undefined) => {
  const allData = { k: 'all data will come later' }; /// change after to: await...
  return allData;

  // if (searchParam === ''|| undefined) {
  // }

  // else {
  // SELECT *product* FROM *productTable*
  // WHERE *product.name* === serchParam
  // }
};

export const getProductById = async (productId: number) => {
  console.log('gggggggggg');

  return {
    product_id: productId,
    name: 'test',
    description: 'test',
    price: 10.99,
    category: 'test',
    image: '/images/products/test.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export async function updateInventory(products: ProductToUpdate[]) {
  console.log('updateInventoryDal');

  return 'updateInventoryDal';
}
