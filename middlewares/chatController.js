import Chat from "../models/chatSchema.js"

export const createChat = async(req,res)=>{
    try {
        const {model} = req.body
        if(!model) 
            return res.status(400).json({message:"model name is required"})

       const chats =  await Chat.create({
            userId:req.user._id,
            model,

        })

        res.status(201).json({
            chatId: chats._id,
            userId: req.user._id,
            model,
            topic: chats.topic,
            createdAt: chats.createdAt
        })
        

    

    
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}


export const getRecentChat = async(req,res)=>{
    try {
   

       const chats = await Chat.find({userId:req.user._id})
                                .select("topic updatedAt")
                                .sort({updatedAt:-1})
                                .limit(20).lean()


     res.status(200).json({message:"your all recent chats", chats})

    

    
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}
