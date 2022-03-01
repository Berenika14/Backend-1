const express = require('express');
const server = express();

server.get('/', (req, res) => res.json('Ok!'));

module.exports = server;
