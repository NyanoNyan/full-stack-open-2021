const config = require('./utils/config');
const express = require('express');
require('express-async-errors')
const cors = require('cors');
const notesRouter = require('./controllers/blog');
const app = express();
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

app.use('/api/blogs', notesRouter);

module.exports = app