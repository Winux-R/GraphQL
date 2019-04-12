const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

// 定义schema类型和方法
const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Query {
    hello: String
    accountName: String
    age: Int
    account: Account
  }
`);
// 定义查询对应的处理器
const root = {
  hello: () => {
    return 'hello world';
  },
  accountName: () => {
    return 'victor'
  },
  age : ()=> {
    return 18
  },
  account: () => {
    return {
      name: 'victor',
      age: 18,
      sex: '男',
      department: '科学院'
    }
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: false,
}));
app.listen(3000, () => {
  console.log('sucess');
});