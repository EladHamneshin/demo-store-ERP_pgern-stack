import * as DAL from '../dal/shopInventoryDAL'

export const getProductById = async (productId: number) => {
  return await DAL.getProductById(productId)
}
