import { AdminProduct, ProductForRedis } from '../types/Product';
import { RedisClient } from '../utils/Redis/redisClient';

export const RedisGetAllProducts = async () => {
  
  const RedisAllProducts = await RedisClient.json.get('products');
  return RedisAllProducts;
};

