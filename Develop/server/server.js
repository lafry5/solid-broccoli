const express = require('express');

// Add Apollo Server
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Import our typeDefs and revolvers
const { typeDefs, resolvers } = require('./schemas');

// Import authMiddleware
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// Create express server
const app = express();

// Create a new instance of an Apollo Server that uses typeDefs, resolvers and authMiddleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Apply the middleware to our Apollo Server instance
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
