import mongoose , {Schema} from "mongoose";

const dailyTaskSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        date:{
            type:Date
        },
        completed:{
            type:Boolean,
            required:true
        }
    },
    {timestamps:true}
)

export const DailyTask = mongoose.model("DailyTask",dailyTaskSchema);