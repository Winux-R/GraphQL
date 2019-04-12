var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Query {
    hello: String
    accountName: String
    account: Account
  }
`);

var root = {
  hello:
    () => 'Hello world!',
  accountName:
    () => 'Hello accountName!',
  account:
    () => {
      return {
        name: 'jinxin',
        age: 18,
        sex: '男',
        department: 'RND'
      }
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));