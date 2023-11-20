type ProductToUpdate = {
    productId: string
    requiredQuantity: number 
}

export async function updateInventoryDal(products: ProductToUpdate[]) {

    console.log("updateInventoryDal", );

    return "updateInventoryDal"
}