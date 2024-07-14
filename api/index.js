import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();


mongoose.connect(process.env.Mongodb).then(()=>{
    console.log('Conntected to mongoDb')
}).catch((err)=>{
    console.log(err);
})

const app=express();

app.listen(3000,()=>{
    console.log("Server is running on the port 3000");
});