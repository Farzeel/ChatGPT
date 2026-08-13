import dotenv from "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import { connectDb } from "./db.js";

const app = express();

const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser())


app.use("/user" , userRoute)


const startServer =  ()=>{
try{
        app.listen(PORT , async()=>{
            await connectDb()
            console.log(`app is listening on port ${PORT}`)
            
        })

        
    } catch (error) {
        console.log(error)
    }

}

startServer()
