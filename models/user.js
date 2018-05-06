const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = require('bluebird');

const taskSchema = new mongoose.Schema({
  title: String,
  points: Number,
  description: String,
  dueDate: String,
  time: String,
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

userSchema.plugin(require('mongoose-unique-validator'));

// userSchema.set('toJSON', {
//   transform(doc, json){
//     delete json.password;
//     return json;
//   }
// });

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next){
  if(!this.password && !this.githubId) {
    this.invalidate('password', 'password is required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
