const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

//middleware added
//to convert json data in a type of js object
app.use(express.json());

app.post("/signup", async (req, res) => {
 
  // Creating a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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