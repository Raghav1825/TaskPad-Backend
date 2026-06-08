import mongoose , {Schema} from "mongoose";

const userSettingSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        theme:{
            type:String,
            enum:["light","dark"]
        },

    },
    {timestamps:true}
)

export const UserSettings = mongoose.model("UserSettings",userSettingSchema);