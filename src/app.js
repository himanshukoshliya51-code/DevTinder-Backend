const express = require('express');

const app = express();


//This will only handle get call to user
app.get("/user/:userID/:name",(req,res) =>{
    console.log(req.params);
    // console.log(req.query);

    res.send({firstName:"Himasnhu", lastname:"Yadav"});
});

app.listen(911 , () =>{
    console.log("Server is successfully listening to our port 911...");
});