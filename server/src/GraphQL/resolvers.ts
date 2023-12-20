import { gql, ApolloServer } from 'apollo-server-express';
import UserService from '../services/userService';
import authService from '../services/authService';
import { addNewProductService, deleteProductByIdService, getAllProductsService, getProductByIdService, updateProductByIdService } from '../services/inventoryService';
import { AdminProduct, Product, UpdateBody, ProductForRedis } from '../types/Product';
import { PubSub } from "graphql-subscriptions";
import { NewsEvent } from '../types/Product';


const pubsub = new PubSub();

const resolvers = {
  Query: {
    getUser: (_: never, { id }: { id: string }) => UserService.getUser(id),
    getAllProducts: async (): Promise<ProductForRedis[]> => {
      // check token
      const allProducts = await getAllProductsService();
      return allProducts
    },
    getProductById: async (_: unknown, args: { id: string }): Promise<Product | null> => {
      return await getProductByIdService(args.id);
    }
  },
  Mutation: {
    loginUser: (_: never, { email, password }: { email: string, password: string }) => {
      return authService.loginUser({email, password})
    },
    createUser: (_: never, { email, password }: { email: string, password: string }) => {
      return UserService.createUser({email, password})
    },
    updateUser: (_: never, { email, password }: { email: string, password: string }) => {
      return UserService.updateUser({email, password})
    },
    deleteUser: (_: never, { email, password }: { email: string; password: string }) => {
      return UserService.deleteUser({ email, password })
    },
    addNewProduct: async (_: never, args: { productInput: AdminProduct }): Promise<Product> => {
      return await addNewProductService(args.productInput);
    },
    updateProductById: async (_: never, args: { id: string; updateInput: Partial<AdminProduct> }): Promise<Product> => {
      return await updateProductByIdService(args.updateInput, args.id);
    },
    deleteProductById: async (_: never, args: { id: string }): Promise<string> => {
      return await deleteProductByIdService(args.id);
    },
    sendNewsEvent: (_: never, args: NewsEvent) => {
      console.log('args:', args);
      pubsub.publish("GOT_MESSAGE", {newsFeed: args});
      return args
    }
  },

  Subscription: {
    newsFeed: {
      subscribe: () => {
        return pubsub.asyncIterator(["GOT_MESSAGE"]);
      },
    },
  }
};

export { resolvers }