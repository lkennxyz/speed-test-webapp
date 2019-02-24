const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const db = require('./db');
const api = require('./api-functions');


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Result {
    mbps: Float,
    time: String,
  }
  type Average {
    mbps: Float,
    _id: Int,
  }
  type Query {
    hello: String,
    getToday: [Result],
    getDate(date: String): [Result],
    avgAll: [Average],
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  getToday: async () => {
    const results = await api.date(new Date());
    return results;
  },
  getDate: async ({ date }) => {
    const results = await api.date(date);
    return results;
  },
  avgAll: async () => {
    const results = await api.avgAll();
    return results;
  }
};

(async () => {
  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  app.use('/', express.static(path.join(__dirname, 'client/build')));
  app.listen(process.env.PORT || 4000, async () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
    await db.connect();
  });
})();
