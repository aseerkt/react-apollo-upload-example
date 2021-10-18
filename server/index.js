const path = require('path');
const express = require('express');
const { randomBytes } = require('crypto');
const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    getFiles: [String!]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getFiles: async function () {
      if (fs.existsSync('files')) {
        const files = fs.readdirSync('files');
        return files.map((n) => `http://localhost:5000/files/${n}`);
      } else return [];
    },
  },
  Mutation: {
    singleUpload: async function (root, { file }) {
      const { createReadStream, filename, encoding, mimetype } = await file;
      const stream = createReadStream();

      fs.mkdirSync(path.join(__dirname, 'files'), { recursive: true });

      const output = fs.createWriteStream(
        path.join(
          __dirname,
          'files',
          `${randomBytes(6).toString('hex')}_${filename}`
        )
      );

      stream.pipe(output);

      await new Promise(function (resolve, reject) {
        output.on('close', () => {
          console.log('File uploaded');
          resolve();
        });

        output.on('error', (err) => {
          console.log(err);
          reject(err);
        });
      });

      return { filename, mimetype, encoding };
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  app.use('/files', express.static(path.join(__dirname, 'files')));

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 5000 }, r));

  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

startServer();
