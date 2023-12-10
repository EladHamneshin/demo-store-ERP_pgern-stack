export interface Product {
  id?: string;
  name: string;
  saleprice: number;
  quantity: number;
  description: string;
  category: string;
  discount: number;
  rating: number;
  clicked: number;
  image: {
    alt: string;
    url: string;
  }
  coordinate: {
    longitude: number;
    latitude: number
  };
  tags: {
    [key: string]: string;
  };
  costprice: number;
  isforsale: boolean;
  supplier: string;
}


export interface Category {
  id: string,
  name: string,
  clicked: number,
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

export interface AllCategories {
  id: string,
  name: string,
  clicked: number
}

export interface Tags {
  [key: string]: string;
};
