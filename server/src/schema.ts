
import { gql } from 'apollo-server-express';

import {
    addNewProductService,
    deleteProductByIdService,
    getAllProductsService,
    getProductByIdService,
    updateProductByIdService
} from './services/inventoryService'; // Assuming the same service functions are used



export const typeDefs = gql`
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
        tags: [Tag]
    }

    type Image {
        url: String!
        alt: String!
    }

    type Coordinate {
        longitude: Float
        latitude: Float
    }

    type Tag {
        key: String
        value: String
    }

    type Query {
        getAllProducts: [Product]
        getProductById(id: String): Product
    }

    type Mutation {
        addNewProduct(productInput: ProductInput!): Product
        updateProductById(id: String, updateInput: ProductUpdateInput!): Product
        deleteProductById(id: String): String!
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
`;



import { Product, AdminProduct, UpdateBody } from './types/Product';

const resolvers = {
    Query: {
        getAllProducts: async (): Promise<Product[]> => {
            return await getAllProductsService();
        },
        getProductById: async (_: unknown, args: { id: string }): Promise<Product | null> => {
            return await getProductByIdService(args.id);
        }
    },
    Mutation: {
        addNewProduct: async (_: unknown, args: { productInput: AdminProduct }): Promise<Product> => {
            return await addNewProductService(args.productInput);
        },
        // updateProductById: async (_: unknown, args: { id: string; updateInput: UpdateBody }): Promise<Product> => {
        //     return await updateProductByIdService(args.id, args.updateInput);
        // },
        
        // deleteProductById: async (_: unknown, args: { id: string }): Promise<string> => {
        //     return await deleteProductByIdService(args.id);
        // }
    }
};



