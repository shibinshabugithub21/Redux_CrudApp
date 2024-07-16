import mongoose from "mongoose";

const AdminSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})

const admin=mongoose.model('Admin',AdminSchema)
export default admin