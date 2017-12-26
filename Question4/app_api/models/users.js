var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');




var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});


const iteration = 1000;
const hashsize = 64;
const nrrandombytes = 8;

userSchema.methods.setPassword = function(password){
  // this.salt = crypto.randomBytes(16).toString('hex');
  // this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  // this.salt = crypto.randomBytes(nrrandombytes).toString('hex');
  // this.hash = crypto.pbkdf2Sync(password, this.salt, iteration, hashsize).toString('hex');
  this.hash = password;
  console.log('We got here');
};
 
userSchema.methods.validPassword = function(password) {
  // var hash = crypto.pbkdf2Sync(password, this.salt, iteration, hashsize).toString('hex');
  return this.hash === password;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'thisIsSomeSecret'); // DO NOT KEEP YOUR SECRET IN THE CODE! :)
};


mongoose.model('User', userSchema);