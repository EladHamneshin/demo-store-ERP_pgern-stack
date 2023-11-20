import * as DAL from '../dal/shopInventoryDAL'

export const getAllData = async (searchParam: string|undefined) => {
    try {
        const allData = await DAL.dalAllData(searchParam);
        return allData;
    } catch (error) {
        console.error('an error occurred at services:', error)
    }
}

export const getProductById = async (productId: number) => {
  return await DAL.getProductById(productId)
}
