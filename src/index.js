var express = require('express');
const { ApolloServer } = require('apollo-server-express');
const GRAPHQL_PORT = 4000;

const typeDefs = require('fs').readFileSync(__dirname + "/../schema/new_ticket_type.graphql", 'utf-8');
const { resolvers } = require('./resolvers')

console.log(resolvers)
const server = new ApolloServer({ typeDefs, resolvers });

var app = express();
server.applyMiddleware({ app });

app.listen(GRAPHQL_PORT);
console.log(`Running a GraphQL API server at localhost:${GRAPHQL_PORT}/graphql`);