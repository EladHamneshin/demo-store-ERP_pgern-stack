import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
import {
  addNewProductDal,
  deleteProductByIdDal,
  getAllProductsDal,
  getProductByIdDal,
  updateProductByIdDal,
} from '../dal/inventoryDal';
import { AdminProduct } from '../types/Product';

export const getAllProductsService = async () => {
  const products = await getAllProductsDal();

  if (!products) {
    throw new RequestError(
      'failed to get products',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  } else {
    return products;
  }
};

export const getProductByIdService = async (id: string) => {
  const product: AdminProduct = await getProductByIdDal(id);

  if (!product) {
    throw new RequestError(
      `product with '${id}' id does not exist`,
      STATUS_CODES.BAD_REQUEST
    );
  } else {
    return product;
  }
};

export const addNewProductService = async (
  newProduct: Omit<AdminProduct, 'id'>
) => {
  
  const product: AdminProduct = await addNewProductDal(newProduct);
  if (!product) {
    throw new RequestError(
      'failed to add product',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
  return product;
  
};

export const updateProductByIdService = async (
  partsOfProductToUpdate: Partial<AdminProduct>,
  id: string
) => {
  const product: AdminProduct = await getProductByIdDal(id);
  if (!product) {
    throw new RequestError(
      `product with '${id}' id does not exist`,
      STATUS_CODES.BAD_REQUEST
    );
  }

  const updatedProduct = await updateProductByIdDal(partsOfProductToUpdate, id);
  if (!updatedProduct) {
    throw new RequestError(
      'failed to fetch data',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  } else {
    return updatedProduct;
  }
};

export const deleteProductByIdService = async (id: string) => {
  const product: AdminProduct = await getProductByIdDal(id);

  if (!product) {
    throw new RequestError(
      `product with '${id}' id does not exist`,
      STATUS_CODES.BAD_REQUEST
    );
  }

  await deleteProductByIdDal(id);
};
