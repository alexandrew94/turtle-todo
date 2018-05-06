const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = require('../models/user');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  User.create([{
    username: 'user1',
    email: 'user1@user1',
    password: 'u1',
    passwordConfirmation: 'u1',
    tasks: [{
      title: 'Dishwashing',
      points: 5,
      description: 'I dont mind doing them if i didnt cook',
      dueDate: '2018-05-05',
      time: '16:00',
      recurring: 7
    }, {
      title: 'Walking the Dog',
      points: 5,
      description: 'I like dogs better',
      dueDate: '2018-05-05',
      time: '16:00',
      recurring: 7
    }]}, {
    username: 'user2',
    email: 'user2@user2',
    password: 'u2',
    passwordConfirmation: 'u2',
    score: 25,
    dishwashingScore: 5,
    tasks: [{
      title: 'Dishwashing',
      points: 5,
      description: 'I dont mind doing them if i didnt cook',
      dueDate: '2018-05-06',
      time: '16:00',
      recurring: 7
    }, {
      title: 'Walking the Dog',
      points: 5,
      description: 'I like dogs better',
      dueDate: '2018-05-06',
      time: '16:00',
      recurring: 7
    }]}, {
    username: 'user3',
    email: 'user3@user3',
    password: 'u3',
    passwordConfirmation: 'u3',
    tasks: [{
      title: 'Dishwashing',
      points: 5,
      description: 'I dont mind doing them if i didnt cook',
      dueDate: '2018-05-05',
      time: '16:00',
      recurring: 7
    }, {
      title: 'Walking rex the cat',
      points: 5,
      description: 'I like dogs better',
      dueDate: '2018-05-05',
      time: '16:00',
      recurring: 7
    }]}, {
    username: 'user4',
    email: 'u4@u4',
    password: 'u4',
    passwordConfirmation: 'u4',
    tasks: [{
      title: 'Dishwashing',
      points: 5,
      description: 'I dont mind doing them if i didnt cook',
      dueDate: '2018-05-05',
      time: '16:00',
      recurring: 7
    },{
      title: 'Walking rex the cat' ,
      points: 5,
      description: 'I like dogs better',
      dueDate: '2018-05-05',
      time: '16:00',
      recurring: 7
    } ]
  }])
    .then(users => console.log(`${users.length} users created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());

});
