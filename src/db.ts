import mongoose, { model , Schema } from "mongoose";


const UserSchema = new Schema({
    username : {type : String , unique: true},
    password : String
})


const content = new Schema({
   title : String,
   link : String,
   userid : {type: mongoose.Types.ObjectId,ref:"User",required:true},
   tags : {type: mongoose.Types.ObjectId,ref:"Tag"}
})

// const Tag = new Schema({
//    title : String,
//    link : String,
//    userid : {type: mongoose.Types.ObjectId,ref:"User",require:true},
//    tag : {type: mongoose.Types.ObjectId,ref:"Tag"}
// })




export const UserModel = model("User",UserSchema) ;
export const ContentModel = model("content",content) ;





