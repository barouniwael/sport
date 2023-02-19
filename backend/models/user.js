const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    firstName : { type: String, required: true},
    lastName : { type: String, required: true},
    email : { type: String, index: true, unique: true, required: true },
    pwd : String, 
    avatar:String,
  
}) 

userSchema.plugin(uniqueValidator);
const user = mongoose.model("user", userSchema);

module.exports = user;