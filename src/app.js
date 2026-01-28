const express = require('express');

const app = express();

//This will handle all the API call to itself for /user and the below three will be of no use
//the order of the code matters
// app.use("/user",(req,res) =>{
//     res.send("HAHAHHAHAHAHHAAHAAA.....");
// });


//This will only handle get call to user
app.get("/user",(req,res) =>{
    res.send({firstName:"Himasnhu", lastname:"Yadav"});
});

//This will only handle post call to user
app.post("/user",(req,res) =>{
    res.send("Data successfully saved to database .......");
});

//This will only handle delete call to user
app.delete("/user",(req,res) =>{
    res.send("Deleted successfullly .......");
});


app.use("/test",(req,res) =>{
    res.send("Hello namaste from the server.....");
});

app.listen(911 , () =>{
    console.log("Server is successfully listening to our port 911...");
});