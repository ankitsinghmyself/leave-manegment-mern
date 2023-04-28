const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongodb atlas username and password are temporary for this project

const mongodb_username = process.env.MONGODB_USERNAME; // add your mongodb atlas username
const mongodb_password = process.env.MONGODB_PASSWORD; // add your mongodb atlas password
const mongodb_hostname =
  process.env.MONGODB_HOSTNAME || 'cluster0.fpm5lhj.mongodb.net';
const mongodb_database = process.env.MONGODB_DATABASE || 'leave-management';
const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@${mongodb_hostname}/${mongodb_database}`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/', routes);

app.listen(3300, () => {
  console.log('Server started on port 3300');
});
