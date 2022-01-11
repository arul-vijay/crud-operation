const express= require('express');
const mongoose= require('mongoose');

const app=express();

const port=8080;
const url= "mongodb://192.168.2.192:27017/collegedata";

mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
app.use(express.json());
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}

const studentrouter= require("./routes/students");
app.use('/students',studentrouter)


 
app.listen(port, () =>{
    console.log('Server started');
})