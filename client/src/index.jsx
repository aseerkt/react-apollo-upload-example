import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";


// `uploadLink` is a terminating link
const uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

// `uploadLink` is used instead of httpLink
const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root"));

// client instance is provided to the entire react app using ApolloProvider
// Now we can use apollo hooks (useQuery, useMutation, ...) in child components
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
