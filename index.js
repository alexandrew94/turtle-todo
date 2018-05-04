const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./config/router');

const { port, dbURI } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');

mongoose.connect(dbURI);

app.use(bodyParser.json());
app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => console.log(`Totes on port ${port} tho`));
