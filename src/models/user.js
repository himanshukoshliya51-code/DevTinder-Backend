
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required : true,
    minLength : 3,
    maxLength : 50,
  },
  lastName: {
    type: String,
    minLength : 3,
    maxLength : 50,
  },
  emailId: {
    type: String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address; "+value);
      }
    }
  },
  password: {
    type: String,
    required : true,
     validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error(" Enter a strong password; "+value);
      }
    }
    
  },
  age: {
    type: Number,
    min : 18,
  },
  gender: {
    type: String,
    //validate will only be called when new document is created, not when updated
    //to enable on update we will add runValidators in the update api call
    validate(value){
      if(!["male" , "female" , "others"].includes(value)){
        throw new Error("Gender data is not valid")
      }
    },
  },
  photoURL : {
    type : String,
    default : "https://smsdelhibmw.co.in/our-team/mr-jayant-padgilwar/",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photo URL; "+value);
      }
    }
  },
  about : {
    type : String,
    default : "This is a default about of the user",
  },
  skills : {
    type : [String],
  },

},
{
  timestamps : true,
});

module.exports = mongoose.model("User", userSchema);
