export interface Image {
    url: string;
    alt: string;
  }
  
  export interface Coordinate {
    longitude: number;
    latitude: number;
  }
  
  export interface Tag {
    key: string;
    value: string;
  }
  
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
    image: Image;
    coordinate: Coordinate;
    tags: Tag[];
  }
  
  export interface AdminProduct extends Product {
    isForSale: boolean;
    costPrice: number;
    supplier: string;
  }
  
  export type ProductInput = {
    name: string;
    saleprice: number;
    quantity: number;
    description: string;
    category: string;
    discount: number;
    rating: number;
    clicked: number;
    imageUrl: string;
    imageAlt: string;
    longitude: number;
    latitude: number;
    tags: TagInput[];
  };
  
  export type ProductUpdateInput = {
    name?: string;
    saleprice?: number;
    quantity?: number;
    description?: string;
    category?: string;
    discount?: number;
    rating?: number;
    clicked?: number;
    imageUrl?: string;
    imageAlt?: string;
    longitude?: number;
    latitude?: number;
    tags?: TagInput[];
  };
  
  export interface TagInput {
    key: string;
    value: string;
  }
  
