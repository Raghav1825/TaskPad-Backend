import mongoose , {Schema} from "mongoose";

const userSettingSchema = new Schema(
    {
        user:{
            user:Schema.Types.ObjectId,
            ref:"User"
        },
        theme:{
            type:String,
            enum:["light","dark"]
        },

    },
    {timestamps:true}
)