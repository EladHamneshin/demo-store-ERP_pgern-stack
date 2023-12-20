import { gql } from "apollo-server-express";

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
  isforsale: Boolean
  costprice: Int,
  supplier: String
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

  type NewsEvent {
    title: String
    description: String
  }


  type Mutation {
    loginUser(email: String! password: String!): User
    createUser(email: String! password: String!): User
    updateUser(email: String! password: String!): User
    deleteUser(email: String! password: String!): Massage
    addNewProduct(productInput: ProductInput!): Product
    updateProductById(id: String, updateInput: ProductUpdateInput!): Product
    deleteProductById(id: String): String!
    sendNewsEvent (title: String, description: String): NewsEvent
  }

  type Subscription{
    newsFeed: NewsEvent
  }
  
  schema {
    query:Query
    mutation:Mutation
    subscription:Subscription
} 
`;