import User from "../schemas/userSchema.js"
import bcrypt from "bcrypt"
import { genrateJwtToken } from "../utils/genrateJwtToken.js"
import { loginSchema, signUpSchema } from "../validators/userValidators.js"



const cookiesOption = {
    httpOnly: true,
    secure: false,
    maxAge: 60*60*1000
}

export const signUp  = async (req, res)=>{

    try {

   const result = signUpSchema.safeParse(req.body)

   if(!result.success){
     return res.status(400).json({
                message: result.error.issues[0].message
    })
   }

    const {name,age,password,email} = result.data

    const isEmailExist = await User.findOne({email})

    if(isEmailExist){
        return res.status(400).json({message:"user with this email already exist"})

    }

    const hashedPassword = await bcrypt.hash(password , 12)

    const newUser = await User.create({
        name,
        email,
        age,
        password:hashedPassword
    })

    const jwtToken = genrateJwtToken(newUser._id , newUser.email)



    res.cookie("token",jwtToken,cookiesOption)

    res.status(201).json({message:"User Created Successfully",   
        name,
        age,
        email})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }

}


export const login = async(req,res)=>{

try {
    const result = loginSchema.safeParse(req.body)

   if(!result.success){
     return res.status(400).json({message: result.error.issues[0].message})
   }

   const {email , password} = result.data

   const user = await User.findOne({email})

   if(!user){
    return res.status(400).json({message:"Invalid Credentials"})
   }

   const isPasswordMatched = await bcrypt.compare(password,user.password)

   if(!isPasswordMatched){
    return res.status(400).json({message:"Invalid Credentials"})

   }

   const token = genrateJwtToken(user._id,user.email)

   res.cookie("token",token,cookiesOption)

   res.status(200).json({message:"User LoggedIn Successfully",
    name:user.name,
    email:user.email,
    age:user.age,
    usage:user.usage
   })
    
} catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
}


}

export const logout = async(req,res)=>{
    try {

        res.clearCookie("token" ,{
            httpOnly:true,
            secure:false
        })
        res.status(200).json({message:"user LoggedOut Successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

export const profile = (req,res)=>{
    try {
        
        res.status(200).json({
            name:req.user.name,
            age: req.user.age,
            usage: req.user.usage,
            email: req.user.email
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

export const deleteAccount = (req,res)=>{
    try {

        const userId = req.user._id

        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

