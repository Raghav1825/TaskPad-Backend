import mongoose , {Schema} from "mongoose";

const userSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },

        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        profileImage:{
            type:String
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        phoneNumber:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        refreshToken:{
            type:String
        }
    },
    {timestamps:true}
)

export const User = mongoose.model("User",userSchema);