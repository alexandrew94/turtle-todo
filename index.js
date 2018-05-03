const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./config/router');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/project-3');

app.use(bodyParser.json());
app.use('/api', router);

app.listen(4000, () => console.log('Totes on port 4000 tho'));
