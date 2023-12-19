import { gql } from 'apollo-server-express';
import UserService from './services/userService';
import authService from './services/authService';
import { AdminProduct, Product } from './types/Product';
import {
  addNewProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductByIdService
} from './services/inventoryService';

const typeDefs = gql(`
scalar JSON

type Product {
  id: String
  name: String
  saleprice: Float
  quantity: Int
  description: String
  category: String
  discount: Float
  rating: Float
  clicked: Int
  image: Image
  coordinate: Coordinate
  tags: JSON
  isforsale: Boolean
  costprice: Int
  supplier: String
}

type Image {
  url: String!
  alt: String!
}

type Coordinate {
  longitude: Float!
  latitude: Float!
}

input ProductInput {
  name: String
  saleprice: Float
  quantity: Int
  description: String
  category: String
  discount: Float
  rating: Float
  clicked: Int
  image: ImageInput
  coordinate: CoordinateInput
  tags: JSON
  isforsale: Boolean
  costprice: Int
  supplier: String
}

input ImageInput {
  url: String
  alt: String
}

input CoordinateInput {
  longitude: Float
  latitude: Float
}

  type User {
    id: ID!
    email: String!
    token: String!
    password: String! # This should not be queried directly, only used for mutations
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProductById(id: String): Product
  }

  input UserInput {
    email: String!, password: String!
  }

  type Massage {
    massage: String! # This should not be quer
  }
  
  type Mutation {
    loginUser(email: String! password: String!): User
    createUser(email: String! password: String!): User
    updateUser(email: String! password: String!): User
    deleteUser(email: String! password: String!): Massage
    addNewProduct(productInput: ProductInput!): Product
    updateProductById(id: String, updateInput: ProductInput!): Product
    deleteProductById(id: String): String!
  }
`);

const resolvers = {
  Query: {
    getUser: (_: never, { id }: { id: string }) => UserService.getUser(id),
    getAllProducts: async () => {
      // check token
      const allProduct = await getAllProductsService();
      return allProduct;
    },
    // getAllUsers: (_: never) => UserService.,
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

    addNewProduct: async (_: never, args: {productInput: AdminProduct}): Promise<Product> => {
      /// check token
      return await addNewProductService(args.productInput);
    },

    updateProductById: async (_: never, args: {updateInput: Partial<AdminProduct>,  id: string;  }): Promise<Product> => {
      console.log("args.updateInput", args);
      
      return await updateProductByIdService(args.updateInput, args.id);
    },

    deleteProductById: async (_: never, args: { id: string }): Promise<string> => {
      return await deleteProductByIdService(args.id);
    }
  },
};

export { typeDefs, resolvers }
