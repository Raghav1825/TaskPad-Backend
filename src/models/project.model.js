import mongoose , {Schema} from "mongoose";

const projectSchema = new Schema(
    {
        projectName:{
            type:String,
            required:true,
            trim:true
        },
        projectDescription:{
            type:String,
            required:true
        },
        projectStatus:{
            type:String,
            required:true,
            enum:["Not Started","In Progress","Done"]
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        members:[
            {
                type:Schema.Types.ObjectId,
                ref:"User"
            }
        ]
    },
    {timestamps:true}
)

export const Project = mongoose.model("Project",projectSchema);