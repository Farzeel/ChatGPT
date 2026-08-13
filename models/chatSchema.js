import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
    
    topic:{
        type:String,
        maxLength:50,
        default:"new Chat"
    },

    model:{
        type:String,
        required:true,
        maxLength:15
    },

    summary:{
        type:string,
        default:""
    },
    summaryUpdatedAt:{
        type:Date,
        default:null
    },
    summarizeTillMessageNumber:{
        type:Number,
        default:0
    },

    messageCount:{
        type:Number,
        default:0
    },

    usage:{
        promptToken:{
            type:Number,
            default:0
        },
        completionToken:{
            type:Number,
            default:0
        },
        totalTokens:{
            type:Number,
            default:0
        }
    }

},
{timestamps:true})

chatSchema.index({userId:1,updatedAt:-1})

const Chat = mongoose.model("Chat",chatSchema)

export default Chat