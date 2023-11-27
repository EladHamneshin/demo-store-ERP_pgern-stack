import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';
import {
  addNewProductDal,
  deleteProductByIdDal,
  getAllProductsDal,
  getProductByIdDal,
  updateProductByIdDal,
} from '../dal/inventoryDal';
import { AdminProduct, SqlProduct } from '../types/Product';

export const getAllProductsService = async () => {
  const preProducts = await getAllProductsDal();
  const products = preProducts.map(convertToAdminProduct);
  if (!products) {
    throw new RequestError(
      'failed to fetch data',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  } else {
    return products;
  }
};

export const getProductByIdService = async (id: string) => {
  const preProduct: AdminProduct[] = await getProductByIdDal(id);
  const product = convertToAdminProduct(preProduct[0]);
  if (!product) {
    throw new RequestError(
      'failed to fetch data',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  } else if (!product.id) {
    console.log(product);
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
  const product: AdminProduct[] = await addNewProductDal(newProduct);

  const res = convertToAdminProduct(product[0]);
  if (!res) {
    throw new RequestError(
      'failed to fetch data',
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  } else {
    return res;
  }
};

export const updateProductByIdService = async (
  partsOfProductToUpdate: Partial<AdminProduct>,
  id: string
) => {
  // const product: AdminProduct[] = await getProductByIdDal(id);
  // if (!product.id){
  //     throw new RequestError(`product with '${id}' id does not exist`, STATUS_CODES.BAD_REQUEST);
  // }

  const rawProduct = await updateProductByIdDal(partsOfProductToUpdate, id);
  const updatedProduct = convertToAdminProduct(rawProduct[0]);

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
  // const product: AdminProduct = await getProductByIdDal(id);
  // if (!product.id){
  //     throw new RequestError(`product with '${id}' id does not exist`, STATUS_CODES.BAD_REQUEST);
  // }

  const deletedProduct = await deleteProductByIdDal(id);
  // if (!deletedProduct) {
  //     throw new RequestError('failed to fatch data', STATUS_CODES.INTERNAL_SERVER_ERROR);
  // } else {
  //     return deletedProduct;
  // };
};

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
    clicked: source.click,
    image: { url: source.image_url, alt: source.image_alt },
    coordinate: { longitude: source.longitude, latitude: source.latitude },
    tags: source.tags,
    isForSale: source.isforsale,
    costPrice: source.costprice,
    supplier: source.supplier,
  };

  return adminProduct;
}

function updateProduct(original: SqlProduct, updates: Partial<AdminProduct>) {
  let updatedProduct = original;
  updates.name
    ? (updatedProduct.name = updates.name)
    : (updatedProduct.name = original.name);
  updates.salePrice
    ? (updatedProduct.salePrice = updates.salePrice)
    : (updatedProduct.salePrice = original.salePrice);
  updates.quantity
    ? (updatedProduct.quantity = updates.quantity)
    : (updatedProduct.quantity = original.quantity);
  updates.description
    ? (updatedProduct.description = updates.description)
    : (updatedProduct.description = original.description);
  updates.category
    ? (updatedProduct.category = updates.category)
    : (updatedProduct.category = original.category);
  updates.discountPercentage
    ? (updatedProduct.discountPercentage = updates.discountPercentage)
    : (updatedProduct.discountPercentage = original.discountPercentage);
  updates.rating
    ? (updatedProduct.rating = updates.rating)
    : (updatedProduct.rating = original.rating);
  updates.clicked
    ? (updatedProduct.click = updates.clicked)
    : (updatedProduct.click = original.click);
  updates.image?.url
    ? (updatedProduct.image_url = updates.image.url)
    : (updatedProduct.image_url = original.image_url);
  updates.image?.alt
    ? (updatedProduct.image_alt = updates.image.alt)
    : (updatedProduct.image_alt = original.image_alt);
  updates.coordinate?.latitude
    ? (updatedProduct.latitude = updates.coordinate.latitude)
    : (updatedProduct.latitude = original.latitude);
  updates.coordinate?.longitude
    ? (updatedProduct.longitude = updates.coordinate.longitude)
    : (updatedProduct.longitude = original.longitude);
  updates.tags
    ? (updatedProduct.tags = updates.tags)
    : (updatedProduct.tags = original.tags);
  updates.isForSale
    ? (updatedProduct.isForSale = updates.isForSale)
    : (updatedProduct.isForSale = original.isForSale);
  updates.costPrice
    ? (updatedProduct.costPrice = updates.costPrice)
    : (updatedProduct.costPrice = original.costPrice);
  updates.supplier
    ? (updatedProduct.supplier = updates.supplier)
    : (updatedProduct.supplier = original.supplier);
}
