const express = require('express');

const app = express();

const {adminAuth,userAuth}= require('./middlewares/auth');


//Handle auth Middleware for all request(GET,POST,.....)
app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res) =>{
    res.send("All data sent");
});

app.get("/admin/deleteUser",(req,res) =>{
    res.send("All data Deleted");
});

app.get("/user",userAuth,(req,res) =>{
    res.send("All data Deleted");
});


// //Another way to use multiple route handlers
// //works same way as previous
// app.get("/user",(req,res,next)=>{
//     console.log("Handling the route user1..")
//    // res.send("1st Response...");
//     next(); // if we donot have next here and res.send then the postman will load foreever the user will not get the response of its call
//     //here this function is called middleware
// });

// app.get("/user",(req,res,next)=>{
//     console.log("Handling the route user2..")
//     res.send("2nd Response...");
//     //here this function is called route handler
//     // next(); here also next will give error in postman 
    
// });


app.listen(911 , () =>{
    console.log("Server is successfully listening to our port 911...");
});