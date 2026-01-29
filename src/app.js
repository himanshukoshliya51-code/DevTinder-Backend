const express = require('express');

const app = express();

//Error handling......
app.get("/getUserdata",(req,res) =>{
//try catch is proper way it should be used always, but what if there are some unhandled errors

// try{
    throw new error("njvdjv");
    res.send("User data sent");
// }
// catch(err){
// res.status(500).send("some error:.......")
// }
//here we have catched error here only so it will not go to the next "/" functon because that function require some error
});




//this function will not be called first even if "/" because it has err ,it will only be runned if err present
//this function will only be called when we have some error otherwise it will not be runned
app.use("/",(err,req,res,next)=>{//error should be 1st parameter
if(err){
    res.status(500).send("Something went wrong");
}
});
//this function should be kept at last of our application  because if anything breaks in our code it should be handled here 



app.listen(911 , () =>{
    console.log("Server is successfully listening to our port 911...");
});