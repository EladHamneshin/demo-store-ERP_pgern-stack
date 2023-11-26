export interface Product {
  id: string;
  name: string;
  saleprice: number;
  quantity: number;
  description: string;
  category: string;
  discount: number;
  rating: number;
  click: number;
  image_url: string;
  image_alt: string;
  longitude: number;
  latitude: number;
  tags: {
    [key: string]: string
  };
}

export interface AdminProduct {
  id: string ,
  name: string,
  salePrice: number,
  quantity : number,
  description : string,
  category: string,
  discountPercentage : number,
  rating : number,
  click: number,
  image: { url: string, alt: string },
  coordinate: { longitude: number, latitude: number },
  tags:  { [key: string]: string},
  isForSale : boolean,
  costPrice: number,
  supplier : string,
}

// export interface ProductToUpdate {
//   productId: string;
//   requiredQuantity: number;
// };

export type UpdateBody = {
  Products: {
    productId: string
    requiredQuantity: number
  }[]
  action: string;
} 

export interface ProductsArr {
  [productId: string]: number;
};

export interface SqlProduct {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  click: number;
  image_url: string;
  image_alt: string;
  longitude: number;
  latitude: number;
  tags: { [key: string]: string };
  isForSale: boolean;
  costPrice: number;
  supplier: string;
}
