const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { Error } = require("mongoose");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

//middleware added
//to convert json data in a type of js object
app.use(express.json());

app.post("/signup", async (req, res) => {
  //validation of data
  try {
  validateSignUpData(req);


  //Encrypt the password
  const { firstName, lastName, emailId, password} = req.body;
  const passwordHash =await bcrypt.hash(password,10); 
 
  // Creating a new instance of the User model
  const user = new User({
    firstName, 
    lastName, 
    emailId, 
    password:passwordHash,
  });

  
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});



//get user by email
app.get("/user", async(req,res)=>{
  const userEmail = req.body.emailId;

  try{
    const users = await User.find({emailId:userEmail});//in place of find we can also use findOne to find out one object from many of same emailId
    //findOne() returns the first matching document based on MongoDB’s internal order, which is not guaranteed unless sorting is applied. 
    if(users.length === 0){
      res.status(404).send("user not found");
    }
    else{
      res.send(users);
    }
  }
  catch(err){
    res.status(400).send("something went wrong");
  }

})

// Feed API - GET/feed - get all the users from the database
app.get("/feed",async(req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  }
  catch(err){
    res.status(400).send("something went wrong");
  }
})

//to delete a user from the database
app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
        const user = await User.findByIdAndDelete({_id: userId});
        // Issue a MongoDB findOneAndDelete() command by a document's _id field. In other words, findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id }).
    //const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  }
  catch(err){
    res.status(400).send("Somenthing went wrong");
  }
})

//Update data of the user
app.patch("/user/:userId",async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;
  
  try{

    //if the user is updating its profile it can update certain fields in the API
  const ALLOWED_UPDATES = ["photoURL","about","gender","age","skills"]

  const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
  if(!isUpdateAllowed){
    throw new Error("Update not Allowed");
  }

  if(data?.skills.length >10){
    throw new Error("Skilss cant be more than 10");
  }


    await User.findByIdAndUpdate({ _id : userId },data,{
      returnDocument : "after",
      runValidators : true,
    });
    res.send("User updated successfully");

  }catch(err){
    res.status(400).send("Update Failed : "+err.message);
  }
});


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });