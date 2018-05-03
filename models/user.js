const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tasks: [ taskSchema ]
});

module.exports = mongoose.model('User', userSchema);
