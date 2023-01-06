/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const displayRoutes = require('express-routemap');
const { context } = require('./app/config');

const { config } = require('./app/config');

const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || context.port;

app.set('port', port);

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mongo connection
mongoose.Promise = global.Promise;
const mongoOptions = { useNewUrlParser: true };
if (context.mongoConnection.mongoUser) {
  mongoOptions.tls = true;
  mongoOptions.useUnifiedTopology = true;
  mongoOptions.user = context.mongoConnection.mongoUser;
  mongoOptions.pass = context.mongoConnection.mongoPassword;
}
mongoose.set('strictQuery', false);
mongoose.connect(`${context.mongoConnection.mongoUri}`, mongoOptions);

mongoose.connection.on('Connected', () => {
  console.log('Connected to mongo instance');
  console.log('Mongo URI: ', context.mongoConnection.mongoUri);
});

mongoose.connection.on('Disconnected', () => {
  console.log('Disconnected from mongo instance');
  if (mongoose.connection.readyState === 0) {
    mongoose.connection.readyState = 2;
    setTimeout(() => {
      mongoose.connect(`${context.mongoConnection.mongoUri}`, mongoOptions);
    }, config.mongo.reconnectionInterval);
  }
});

// Health Check
app.get(`/api/${context.version}/health/`, (req, res) => {
  res.send(`${context.name} is running`);
});

const server = http.createServer(app);

const apiRoute = require('./app/routes/api-route');

app.use(`/api/${context.version}`, apiRoute);

server.listen(port, host, () => {
  console.log(`Starting the service [${context.name}] on port ${port}...`);
  displayRoutes(app);
});

app.use((err, req, res) => {
  res.status(500).send({ code: 'Error', message: err.message });
});

app.use((_, res) => {
  res.status(404).send({ message: 'no Route matched with those values' });
});

module.exports = app;
