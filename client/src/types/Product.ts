export interface Product {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  rating: number;
  click: number;
  image: {
    alt: string;
    url: string;
  }
  coordinate: {
    longitude: number;
    latitude: number
  };
  costPrice: number;
  isForSale: boolean;
  supplier: string;
  tags: {
    [key: string]: string
  };
}