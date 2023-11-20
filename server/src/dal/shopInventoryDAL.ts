import second from '../configs/db'

export const getProductById = async (productId: number) => {
  console.log('gggggggggg');
  
  return {
    product_id: productId,
    name: "test",
    description: "test",
    price: 10.99,
    category: "test",
    image: "/images/products/test.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}