import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
