import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
    minLength:3,
    maxLength:30,
    trim:true
},
email:{
    type:String,
    required:true,
    minLength:5,
    maxLength:40,
    trim:true,
    unique:true
},
password:{
    type:String,
    required:true,
    minLength:8,
    maxLength:30,

},
age:{
    type:Number,
    required:true,
    min:10,
    max:100,
},
usage:{
    tokenUsed:{
        type:Number,
        default:0
    },
    resetAt:{
        type:Date,
        default: ()=> new Date(Date.now + 5 * 60 * 60 * 1000)
    },
    totalTokenUsed:{
        type:Number,
        default:0
    }

}

},
{timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User