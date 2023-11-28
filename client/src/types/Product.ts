export interface Product {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  click?: number;
  image: {
    alt: string;
    url: string;
  }
  coordinate?: {
    longitude: number;
    latitude: number
  };
  tags?: {
    [key: string]: string;
  };
  costPrice: number;
  isForSale: boolean;
  supplier: string;
}

export interface AdminProduct extends Product {
  isForSale: boolean;
  costPrice: number;
  supplier: string;
}

export type UpdateBody = {
  Products: {
    productId: string;
    requiredQuantity: number;
  }[];
  action: string;
};

export interface ProductsArr {
  [productId: string]: number;
}
