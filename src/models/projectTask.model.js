import mongoose , {Schema} from "mongoose";

const projectTaskSchema = new Schema(
    {
        project:{
            type:Schema.Types.ObjectId,
            ref:"Project",
        },
        taskName:{
            type:String,
            required:true,
            trim:true
        },
        taskDescription:{
            type:String
        },
        taskStatus:{
            type:String,
            enum:["not started","in progress","done"]
        },
        addedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        editedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true}
)

export const ProjectTask = mongoose.model("ProjectTask",projectTaskSchema);