var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
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
    salary(city: String): Int
  }
  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }
  type Query {
    accounts: [Account]
  }
`);

var root = {
  accounts() {
    var arr = [];
    for (const key in fakeDb) {
      arr.push(fakeDb[key]);
    }
    return arr;
  },
  createAccount({ input }) {
    fakeDb[input.name] = input;
    return fakeDb[input.name];
  },
  updateAccount({ id, input }) {
    const updateAccount = Object.assign({}, fakeDb[id], input);
    fakeDb[id] = updateAccount;
    return updateAccount;
  }
};
const fakeDb = {};
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(5001, () => console.log('Now browse to localhost:5001'));