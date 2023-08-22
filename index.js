const express= require("express");
const mongoose=require ("mongoose");
const cors= require("cors");
require('dotenv').config();

const connectionString= process.env.MONGODB_CONNECTION_STRING;
const port= process.env.PORT;

const app=express();
app.use(cors());
app.use(express.json());


mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port,()=>{
    console.log("The server started at port 3000");
})