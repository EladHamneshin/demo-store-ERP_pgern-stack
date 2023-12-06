const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const { notFound, errorHandler } = require('./middlewares/errorsMiddleware');
const { connectDB } =require ('./configs/db');
const { dotenv } = require('dotenv');

const app = express();
dotenv.config();

async function startApolloServer() {
  await connectDB()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use(notFound);
  app.use(errorHandler);

  const port = process.env.PORT || 4000;

  await new Promise(resolve => app.listen(port, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
export default app