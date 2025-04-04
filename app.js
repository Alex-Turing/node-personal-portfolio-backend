const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const githubRouter = require('./routes/github');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tinyMorgan);
app.use(middleware.customMorgan);

app.use('/api/github', githubRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;