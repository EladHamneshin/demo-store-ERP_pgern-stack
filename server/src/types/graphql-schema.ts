// import { gql } from 'apollo-server-express';
// import * as userService from "../services/userService";
// import userValidation from "../utils/validations/userValidation";

// export const typeDefs = gql`#graphql
//   type User {
//     id: ID
//     email: String
//   }

//   input UserInput {
//     email: String!
//     password: String!
//     confirmPassword: String!
//   }

//   type Query {
//     getUser: User
//   }

//   type Mutation {
//     registerUser(userInput: UserInput): User
//   }
// `;

// // Note: You would need to add appropriate error handling, authentication, and authorization logic in your resolvers.

// export const resolvers = {
//   Query: {
//     getUser: async (_, __, { req }) => {
//       // Implement logic to fetch user details based on the authenticated user (req.userId)
//       const user = await userService.getUser(req.userId);

//       return {
//         id: user.id,
//         email: user.email,
//       };
//     },
//   },
//   Mutation: {
//     registerUser: async (_, { userInput }) => {
//       // Implement logic to register a new user based on the provided userInput
//       const { error } = userValidation(userInput);
//       if (error) {
//         // Handle validation errors
//         // You might want to throw an error or return appropriate information
//       }

//       const user = await userService.addUser(userInput);

//       return {
//         id: user.id,
//         email: user.email,
//       };
//     },
//   },
// };
