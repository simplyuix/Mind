//  express { Mhas different func/lib } => { for express and other there is only Js file not ts file So is the error nodule not found }
// error means express doesn't have types 
// @types/express { is a place where all types are defined } = > (.d.ts file)

import express from "express" ;
import mongoose from "mongoose" ;
import jwt from "jsonwebtoken" ;
import dotenv from 'dotenv';
import { UserModel } from "./db";

dotenv.config();

const app = express() ;
const con = mongoose.connect(process.env.MONGODB_URI!)
app.use(express.json())
app.post('/api/v1/signup',async (req,res)=>{


     const username = req.body.username ;
     const password = req.body.password ; 
     try {
    await UserModel.create({
        username ,
        password
    })
     res.json({
        message :"user signed in"
     })
     }
     catch(e){
        res.status(411).json({
            message : "User Already exists",
            

        })
        
     }
     })


app.post('/api/vi/content',(req,res)=>{

})

app.get('/api/vi/content',(req,res)=>{
    console.log("Connection done!")

})

app.delete('/api/vi/signin',(req,res)=>{

})

app.post('/api/vi/brain/share',(req,res)=>{

})

app.get('/api/vi/brain/:sharelink',(req,res)=>{

})

app.listen(3000);