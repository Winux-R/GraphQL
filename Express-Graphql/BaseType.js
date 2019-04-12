var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
    salary(city: String): Int
  }
  type Query {
    getClassMates(classNo: Int!): [String]
    account(userName: String!): Account
  }
`);

var root = {
  getClassMates({ classNo }) {
    const Obj = {
      31: ['张三', '李四'],
      61: ['张大三', '李大四'],
    };
    return Obj[classNo];
  },
  account({ userName }) {
    const name = userName;
    const sex = '男';
    const age = 18;
    const department = 'RND';
    const salary = ({ city }) => {
      if (city === '北京' || city === '上海' || city === '广州' || city === '深圳') {
        return 10000;
      }
      return 3000;
    };
    return {
      name,
      sex,
      age,
      department,
      salary
    }
  }
};
var app = express();
app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(5000, () => console.log('Now browse to localhost:5000'));