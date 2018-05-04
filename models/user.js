const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  actionRequired: Boolean,
  recurring: Number
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  score: Number,
  dishwashingScore: Number,
  tasks: [ taskSchema ]
});

taskSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
