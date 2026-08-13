import mongoose from "mongoose";

export const connectDb = async ()=>{


 const con =    await mongoose.connect(process.env.MONGO_URI)

 if(con.connection.readyState==1){
    console.log("connected to database")
 }else{
 throw new Error("failed to connect to database")
 }

}