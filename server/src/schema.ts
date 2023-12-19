import { gql, ApolloServer } from 'apollo-server-express';
import UserService from './services/userService';
import authService from './services/authService';
import { addNewProductService, deleteProductByIdService, getAllProductsService, getProductByIdService, updateProductByIdService } from './services/inventoryService';
import { AdminProduct, Product, UpdateBody, ProductForRedis } from './types/Product';

const typeDefs = (`#gql
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
  tags: Tags
  isforsale: Boolean
  costprice: Int,
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

type Tags {
  key: String!
  value: String!
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
  imageUrl: String
  imageAlt: String
  longitude: Float
  latitude: Float
  tags: [TagInput]
}

input ProductUpdateInput {
  name: String
  saleprice: Float
  quantity: Int
  description: String
  category: String
  discount: Float
  rating: Float
  clicked: Int
  imageUrl: String
  imageAlt: String
  longitude: Float
  latitude: Float
  tags: [TagInput]
}

input TagInput {
  key: String!
  value: String!
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
    updateProductById(id: String, updateInput: ProductUpdateInput!): Product
    deleteProductById(id: String): String!
  }
`);

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
    }
  },
};

export { typeDefs, resolvers }
