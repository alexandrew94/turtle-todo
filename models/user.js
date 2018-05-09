const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = require('bluebird');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: String, required: true },
  time: String,
  recurring: Number,
  location: {
    lat: {type: Number},
    lng: {type: Number}
  }
},
{
  timestamps: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: Number,
  // taskScores: { type: Object },
  dishwashingScore: Number,
  takeOutRecyclingAndBinsScore: Number,
  changeTheBedSheetsScore: Number,
  takeCareOfBinsScore: Number,
  checkAndChangeLightbulbsScore: Number,
  cleanKitchenScore: Number,
  cleanBathroomScore: Number,
  cleanBedroomScore: Number,
  cleanLivingRoomScore: Number,
  deepCleanScore: Number,
  foodShoppingScore: Number,
  cleaningEquipmentScore: Number,
  ikeaScore: Number,
  walkTheDogScore: Number,
  cleanOutTheCarScore: Number,
  workOnGardenScore: Number,
  exerciseScore: Number,
  updatingComputerSoftwareScore: Number,
  clothesWashingScore: Number,
  tasks: [ taskSchema ],
  completedTasks: [ taskSchema ]
});

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   score: Number,
//   taskScores: [ { dishwashingScore: Number },
//     { takeOutRecyclingAndBinsScore: Number },
//     { changeTheBedSheetsScore: Number },
//     { takeCareOfBinsScore: Number },
//     { checkAndChangeLightbulbsScore: Number },
//     { cleanKitchenScore: Number },
//     { cleanBathroomScore: Number },
//     { cleanBedroomScore: Number },
//     { cleanLivingRoomScore: Number },
//     { deepCleanScore: Number },
//     { foodShoppingScore: Number },
//     { cleaningEquipmentScore: Number },
//     { ikeaScore: Number },
//     { walkTheDogScore: Number },
//     { cleanOutTheCarScore: Number },
//     { workOnGardenScore: Number },
//     { exerciseScore: Number },
//     { updatingComputerSoftwareScore: Number },
//     { clothesWashingScore: Number } ],
//   tasks: [ taskSchema ],
//   completedTasks: [ taskSchema ]
// });

taskSchema.set('toJSON', {
  virtuals: true
});

taskSchema.virtual('displayTitle')
  .get(function() {
    return this.title.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){
      return str.toUpperCase();
    });
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
  if(!this.password) {
    this.invalidate('Password', 'Password is required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('Password Confirmation', 'Does not match');
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
