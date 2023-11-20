import * as DAL from '../dal/shop_inventoryDAL'

export const getProductById = async (productId: number) => {
  return await DAL.getProductById(productId)
}
