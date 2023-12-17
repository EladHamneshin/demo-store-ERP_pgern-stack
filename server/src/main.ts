const express = require('express');
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middlewares/errorsMiddleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();


export async function startApolloServer() {
  dotenv.config();
  // app.use(cors());
  // app.use(morgan('dev'));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  // app.use(cookieParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(notFound);
  app.use(errorHandler);
  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 5000;

  await new Promise(() => app.listen({ port: port }));
  console.log(`🚀 Server ready at ${port} ${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()