//  express { Mhas different func/lib } => { for express and other there is only Js file not ts file So is the error nodule not found }
// error means express doesn't have types 
// @types/express { is a place where all types are defined } = > (.d.ts file)

import express from "express" ;
import mongoose from "mongoose" ;
import jwt from "jsonwebtoken" ;
import dotenv from 'dotenv';
import { UserModel,ContentModel,LinkModel } from "./db";
import {usrMiddleware} from "./middleware";
import cors from "cors";
import {random} from "./utils";
import { Request, Response } from 'express';

dotenv.config();

const app = express() ;
const con = mongoose.connect(process.env.MONGODB_URI!)
app.use(express.json())
app.use(cors())


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

app.post('/api/v1/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const usr = await UserModel.findOne({ username, password });

    if (!usr) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: usr._id }, process.env.secretKey!);

    res.json({
      username,
      token,
      message: "User signed in"
    });

  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/v1/content", usrMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})



app.get("/api/v1/content", usrMiddleware, async (req, res) => {
    
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", usrMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", usrMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000);