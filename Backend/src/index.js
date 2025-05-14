
require('dotenv').config();
const express= require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const http = require('http');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // load enviorment variable 

const app =express();
const server = http.createServer(app);


connectDB();
app.use(express.json());


app.use('/api/v1', authRoutes);


const PORT= process.env.PORT || 5000; 
server.listen(PORT, ()=>{console.log(`server is running  on port : ${PORT}`)});

