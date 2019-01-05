var express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const GRAPHQL_PORT = 4000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

var app = express();
server.applyMiddleware({ app });

app.listen(GRAPHQL_PORT);
console.log(`Running a GraphQL API server at localhost:${GRAPHQL_PORT}/graphql`);