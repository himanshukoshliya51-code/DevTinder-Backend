
const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required : true,
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
