import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
import { addNewProductDal, deleteProductByIdDal, getAllProductsDal, getProductByIdDal, updateProductByIdDal } from '../dal/inventoryDal'
import { AdminProduct } from '../types/Product';

export const getAllProductsService = async () => {

    const preProducts = await getAllProductsDal();
    const products = preProducts.map(convertToAdminProduct);
    if (!products) {
        throw new RequestError('failed to fatch data', STATUS_CODES.INTERNAL_SERVER_ERROR);
    } else {
        return products;
    };
};

export const getProductByIdService = async (id: string) => {

    const preProduct: AdminProduct[] = await getProductByIdDal(id);
    const product = convertToAdminProduct(preProduct[0]);
    if (!product) {
        throw new RequestError('failed to fatch data', STATUS_CODES.INTERNAL_SERVER_ERROR);
    } 
    else if (!product.id){
        console.log(product);
        throw new RequestError(`product with '${id}' id does not exist`, STATUS_CODES.BAD_REQUEST);
    } 
    else {
        return product;
    };
};

export const addNewProductService = async (newProduct: Omit<AdminProduct, "id">) => {
    
    const res: AdminProduct = await addNewProductDal(newProduct)
    if (!res) {
        throw new RequestError('failed to fatch data', STATUS_CODES.INTERNAL_SERVER_ERROR);
    } else {
        return res;
    };
}

export const updateProductByIdService = async (partsOfProductToUpdate: Partial<AdminProduct>, id: string) => {
    
    const product: AdminProduct = await getProductByIdDal(id);
    if (!product.id){
        throw new RequestError(`product with '${id}' id does not exist`, STATUS_CODES.BAD_REQUEST);
    }

    const updatedProduct: AdminProduct = await updateProductByIdDal(partsOfProductToUpdate, id)
    if (!updatedProduct) {
        throw new RequestError('failed to fatch data', STATUS_CODES.INTERNAL_SERVER_ERROR);
    } else {
        return updatedProduct;
    };
}

export const deleteProductByIdService = async (id: string) => {
    
    const product: AdminProduct = await getProductByIdDal(id);
    if (!product.id){
        throw new RequestError(`product with '${id}' id does not exist`, STATUS_CODES.BAD_REQUEST);
    }

    const deletedProduct: AdminProduct = await deleteProductByIdDal(id);
    if (!deletedProduct) {
        throw new RequestError('failed to fatch data', STATUS_CODES.INTERNAL_SERVER_ERROR);
    } else {
        return deletedProduct;
    };
}


function convertToAdminProduct(source: any): AdminProduct {
    const adminProduct: AdminProduct = {
      id: source.id,
      name: source.name,
      salePrice: source.saleprice,
      quantity: source.quantity,
      description: source.description,
      category: source.category,
      discountPercentage: source.discountpercentage,
      rating: source.rating,
      click: source.click,
      image: { url: source.image_url, alt: source.image_alt },
      coordinate: { longitude: source.longitude, latitude: source.latitude },
      tags: source.tags,
      isForSale: source.isforsale,
      costPrice: source.costprice,
      supplier: source.supplier,
    };
  
    return adminProduct;
  }