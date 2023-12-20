import './App.css';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'
import './App.css'
import AppBar from './components/AppBar'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache(),
});



function App() {

  return (
    <>
    <ApolloProvider client={client}>
      <Provider store = {store}>
        <AppBar/>
        <Outlet />
      </Provider>
    </ApolloProvider>
    </>
  )
}

export default App
