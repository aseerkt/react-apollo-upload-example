export const typeDefs = `#graphql
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