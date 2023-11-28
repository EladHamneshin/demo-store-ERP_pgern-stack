import { AdminProduct } from "../types/Product";

export const emptyAdminProduct: AdminProduct =  {
    id: '',
    name: '',
    salePrice: 0,
    quantity: 0,
    description: '',
    category: '',
    discountPercentage: 0,
    rating: 0,
    image: { url: '', alt: '' },
    isForSale: false,
    costPrice: 1,
    supplier: ''
}