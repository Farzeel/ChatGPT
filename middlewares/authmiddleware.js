import jwt from "jsonwebtoken"
import User from "../schemas/userSchema.js"

export const authenticateUser = async (req,res,next)=>{

    try {
    const {token} = res.cookies

    if(!token){
    return res.status(401).json({message:"please login"})
    }

    const verifyToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const existingUser = await User.findById(verifyToken.id).select("-password");

    if(!existingUser){
    return res.status(404).json({ message: "User Doesnt Exist" })
    }

    req.user = existingUser
    next()



} catch (error) {
       console.log(error)
       res.status(500).json({message:"internal server error"}) 
}






}