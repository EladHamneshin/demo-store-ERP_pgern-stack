import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './schema';
import morgan from 'morgan';
import { notFound, errorHandler } from './middlewares/errorsMiddleware';
import shopCategoriesRouter from './routes/categoriesRouter';
import inventoryRouter from './routes/inventoryRouts';
import shopInventoryRouter from './routes/shopInventoryRouts';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import { RedisClient } from './utils/Redis/redisClient';

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


app.use(cors<cors.CorsRequest>());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

server.start().then(async () => {

  app.use(
    '/graphql',
    // cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  app.use('/shopInventory/categories', shopCategoriesRouter);
  app.use('/user', userRoutes);
  app.use('/shopInventory', shopInventoryRouter);
  app.use('/inventory', inventoryRouter);
  app.use(notFound);
  app.use(errorHandler);
  const port: number = Number(process.env.PORT) || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
  console.log(`🚀 Server is ready at port: ${port}`);
  console.log(`http://localhost:5000/graphql`);
  RedisClient.connect()
  .then(() =>  console.log( "connected successfully to Redis client!!!" ))
  .catch((error) => {  if (error instanceof Error) console.log(error.message) });
})

