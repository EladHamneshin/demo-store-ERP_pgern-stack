export interface Product {
  id: string;
  name: string;
  saleprice: number;
  quantity: number;
  description: string;
  category: string;
  discount: number;
  rating: number;
  clicked: number;
  image: { url: string; alt: string };
  coordinate: { longitude: number; latitude: number };
  tags: {
    [key: string]: string;
  };
}

export interface AdminProduct extends Product {
  isforsale: boolean;
  costprice: number;
  supplier: string;
}

export type UpdateBody = {
  items: {
    productId: string;
    quantity: number;
  }[];
  action: string;
};

export interface ProductsArr {
  [productId: string]: number;
}
