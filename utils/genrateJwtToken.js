
import jwt from "jsonwebtoken"

export const genrateJwtToken= (userID,email)=>{

    if(!process.env.ACCESS_TOKEN_SECRET){
        throw new Error("JWT Secret key is missing")
    }

   const token =  jwt.sign({id:userID,email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})

   return token



}