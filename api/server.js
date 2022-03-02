const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const recipeRouter = require('./routers/recipes-router');

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/recipes', recipeRouter);

server.get('/', (req, res) => res.json('Ok!'));

module.exports = server;
