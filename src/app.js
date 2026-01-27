const express = require('express');

const app = express();

app.use("/test",(req,res) =>{
    res.send("Hello namaste from the server.....");
})
app.use("/hello",(req,res) =>{
    res.send("Hello hello hello.....");
})

app.listen(911 , () =>{
    console.log("Server is successfully listening to our port 911...");
});