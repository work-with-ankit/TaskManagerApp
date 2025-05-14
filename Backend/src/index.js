const express= require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const http = require('http');



dotenv.config(); // load enviorment variable 

const app =express();
const server = http.createServer(app);


connectDB();




const PORT= process.env.PORT || 5000; 
server.listen(PORT, ()=>{console.log(`server is running  on port : ${PORT}`)});

