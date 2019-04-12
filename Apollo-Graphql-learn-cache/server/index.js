const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  type PoemQuery {
    id: ID!
    name: String
    content: String
    authorld: Int
    timeCreated: Int
    timeRemoved: Int
  }
  type Query {
    poem(id: Int): PoemQuery
  }
`);
const db = {};
const root = {
  poem: ({ id }) => {
    return {
      id: 1,
      name: "String",
      content: "String",
      authorld: 12,
      timeCreated: 15,
      timeRemoved: 18,
    };
  },
};
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.use(express.static(path.resolve(process.cwd(), 'public')));

app.listen(3000, () => {
  console.log('apollo server start');
});