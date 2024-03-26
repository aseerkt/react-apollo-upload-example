import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { resolvers, typeDefs } from "./schemas.js";

const app = express();

// This middleware should be added before calling `applyMiddleware`.
app.use(graphqlUploadExpress());

app.use("/files", express.static("files"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use("/graphql", express.json(), cors(), expressMiddleware(server));

await new Promise((r) => app.listen({ port: 5000 }, r));

console.log(`🚀 Server ready at http://localhost:5000/graphql`);
