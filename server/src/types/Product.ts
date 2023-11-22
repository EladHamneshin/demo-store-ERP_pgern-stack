export interface Product {
  id: string ,
  name: string,
  salePrice: number,
  quantity : number,
  description : string,
  category: string,
  discountPercentage : number,
  rating : number,
  click: number,
  image: { url: string, alt: string }
  coordinate: { longitude: number, latitude: number } 
  tags:  { [key: string]: string} 
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

