import { getAllProductsDal } from "../../dal/inventoryDal";
import { AdminProduct, ProductForRedis } from "../../types/Product";
import { RedisClient } from "../Redis/redisClient";
import dotenv from "dotenv";
dotenv.config()

export const RedisInsertProducts = async () => { 
  try {
    const allproducts: ProductForRedis[] = await getAllProductsDal();
  
    await RedisClient.json.set('products', '.', allproducts);

  } catch(error) {
    console.log(error);
  }
}
