const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
    type Account {
      name: String
      age: Int
      sex: String
      department: String
      salary(cite: String): Int
    }
    type Query {
      getClassMates(classNo: Int!): [String]
      account(username: String): Account
    }
`);

const root = {
  getClassMates: ({ classNo }) => {
    const obj = {
      31: ['victor'],
      61: ['victory']
    };
    return obj[classNo];
  },
  account: ({username}) => {
    const name = username === '李四' ? 'victor' : username;
    const sex = 'man';
    const age = '18';
    const department = '开发';
    const salary = ({ city }) => {
      if ('北京' === city) {
        return 10000;
      } else {
        return 3000;
      }
    };
    return {
      name,
      sex,
      age,
      department,
      salary
    }

  },
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));
app.use(express.static('public'));
app.listen(3001, () => {
  console.log("server start");
});