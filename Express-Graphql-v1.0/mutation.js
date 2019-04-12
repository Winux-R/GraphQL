const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  input AccountInput {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }
  type Query { 
    account: Account
  }
`);
const DB = {};
const root = {
  account: () => {
    return DB;
  },
  name: () => {
    return 'victor jin';
  },
  createAccount: ({ input }) => {
    DB[input.name] = {
      name: input.name,
      age: input.age,
      sex: input.sex,
      department: input.department,
    };
    return DB[input.name];
  }
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.use(express.static('public'));

app.listen(3002, () => {
  console.log('server start');
});