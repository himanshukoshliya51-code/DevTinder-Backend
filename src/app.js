const express = require('express');

const app = express();


app.use("/user",(req,res,next)=>{
    console.log("Handling the route user1..")
   // res.send("1st Response...");
    next();
},
    (req,res,next)=>{
            console.log("Handling the route user2..")
       // res.send("2nd Response....");
        next();
    },
     (req,res,next)=>{
            console.log("Handling the route user3..")
        res.send("3rd Response....");
       // next(); here it will give error because there is no next so the user call will not be able to find any response
    }
);
app.listen(911 , () =>{
    console.log("Server is successfully listening to our port 911...");
});