const config = require('./utils/config');
const express = require('express');
require('express-async-errors')
const cors = require('cors');
const notesRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const app = express();
const middleware = require('./utils/middleware');
const logger = require('./utils/logger')
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(results => {
        logger.info('connected to MongoDB');
    })
    .catch(error => {
        logger.error('error connection to MONGODB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor);

app.use('/api/blogs', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app