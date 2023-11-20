
export interface Product {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  image: { url: string; alt: string };
}

export interface AdminProduct {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  image: { url: string; alt: string }; 
  isForSale : boolean;
  costPrice: number;
  supplier : string;
}

