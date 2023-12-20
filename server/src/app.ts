import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './GraphQL/types';
import { resolvers } from './GraphQL/resolvers';
import morgan from 'morgan';
import { notFound, errorHandler } from './middlewares/errorsMiddleware';
import shopCategoriesRouter from './routes/categoriesRouter';
import inventoryRouter from './routes/inventoryRouts';
import shopInventoryRouter from './routes/shopInventoryRouts';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import { RedisClient } from './utils/Redis/redisClient';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<MyContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ]
});


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

server.start().then(async () => {
  app.use(cors<cors.CorsRequest>());
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
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

