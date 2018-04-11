var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getMessage(id: ID!): Message
  }
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
  input MessageInput {
    content: String
    author: String
  }
  type Message {
    id: ID!
    content: String
    author: String
  }
`);

var fakeDatabase = {};
// The root provides a resolver function for each API endpoint
var root = {
    getMessage: function ({id}) {
        if (!fakeDatabase[id]) {
            throw new Error("No record with id " + id);
        }
        return new Message(id, fakeDatabase[id]);
    },
    createMessage: function ({id, input}) {
        var id = require('crypto').randomBytes(10).toString('hex');
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage: function (id, input) {
        if(!fakeDatabase[id]) {
            throw new Error("No record with id " + id);
        }
        fakeDatabase[id] = input;
        return new Message(id, input);
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

class Message {
    constructor(id, {content, author}) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');