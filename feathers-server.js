const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const memory = require('feathers-memory');

const app = express(feathers());

// Turn on JSON body parsing for REST services
app.use(express.json())
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport using Express
app.configure(express.rest());
// Set up an error handler that gives us nicer errors
app.use(express.errorHandler());

// Initialize the messages service
app.use('images', memory());

// Start the server on port 3030
const server = app.listen(3030)

// server.on('listening', () => console.log('Feathers REST API started at localhost:3030'));

// module.exports = server
module.exports = {
  app,
  server,
}