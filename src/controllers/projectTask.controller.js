import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ProjectTask } from "../models/projectTask.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProjectTask = asyncHandler(async(req,res)=>{
    const{projectId} = req.params;
    const {taskName,taskDescription}=req.body;

    if(!projectId){
        throw new ApiError(400,"Project id is required");
    }
    if(!taskName){
        throw new ApiError(400,"Task name is required");
    }

    const projectTask = await ProjectTask.create({
        project:projectId,
        taskName,
        taskDescription,
        taskStatus:"not started",
        addedBy:req.user.fullName
    })

    return res
    .status(201)
    .json(new ApiResponse(201,projectTask,"Task created successfully"))
});

const updateTaskStatus=asyncHandler(async(req,res)=>{
    const {taskId} = req.params;
    const {taskStatus} = req.body;

    if(!taskId){
        throw new ApiError(400,"Task id is required");
    }
    if(!taskStatus){
        throw new ApiError(400,"Task status is required");
    }

    const projectTask = await ProjectTask.findByIdAndUpdate(taskId,
        {
            $set:
            {
                taskStatus,
                editedBy:req.user._id
            }
        },
        {new:true}
    );

    return res
    .status(200)
    .json(new ApiResponse(200,projectTask,"Task status updated successfully"))
});


const getProjectTasks = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;

    if(!projectId){
        throw new ApiError(400,"Project id not found");
    }

    const projectTasks = await ProjectTask.find({project:projectId});
    return res
    .status(200)
    .json(new ApiResponse(200,projectTasks,"Project tasks fetched successfully"))
});

const editProjectTask = asyncHandler(async(req,res)=>{
    const {taskId} = req.params;
    const {taskName,taskDescription} = req.body;

    if(!taskId){
        throw new ApiError(400,"Task id is required");
    }
    if(!taskName){
        throw new ApiError(400,"Task name is required");
    }

    const projectTask = await ProjectTask.findById(taskId);
    if(!projectTask){
        throw new ApiError(404,"Project Task not found");
    }

    projectTask.taskName = taskName;
    projectTask.taskDescription = taskDescription;
    projectTask.editedBy = req.user._id;

    await projectTask.save();
    
    return res
    .status(200)
    .json(new ApiResponse(200,projectTask,"Task edited successfully"))
});

const deleteProjectTask = asyncHandler(async(req,res)=>{
    const {taskId} = req.params;

    if(!taskId){
        throw new ApiError(400,"Task id is required");
    }

    const projectTask = await ProjectTask.findByIdAndDelete(taskId);

    return res
    .status(200)
    .json(new ApiResponse(200,projectTask,"Task deleted successfully"))
});

export {
    createProjectTask,
    updateTaskStatus,
    getProjectTasks,
    editProjectTask,
    deleteProjectTask
}
