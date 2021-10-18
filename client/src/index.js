import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// `uploadLink` is a terminating link
const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});

// `uploadLink` is used instead of httpLink
const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

// client instance is provided to the entire react app using ApolloProvider
// Now we can use apollo hooks (useQuery, useMutation, ...) in child components
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
