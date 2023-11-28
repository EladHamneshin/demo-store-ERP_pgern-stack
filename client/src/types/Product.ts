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
  costPrice: number;
  isForSale: boolean;
  supplier: string;
}
