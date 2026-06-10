import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {DailyTask} from "../models/dailyTask.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addDailyTask=asyncHandler(async (req,res)=>{
    const {name , description} = req.body;
    const user = req.user?._id;

    if(!name){
        throw new ApiError(400,"Task name is required");
    }

    const dailyTask = await DailyTask.create({
        user,
        name,
        description,
        completed:false
    });

    return res
    .status(200)
    .json(new ApiResponse(200,"Daily task added successfully",dailyTask));
});

const editTaskDate=asyncHandler(async(req,res)=>{
    const taskId=req.params.taskId;
    const {date} = req.body;

    if(!date){
        throw new ApiError(400,"Date is required");
    }

    const dailyTask = await DailyTask.findByIdAndUpdate(taskId,{$set:{date}},{new:true});

    return res
    .status(200)
    .json(new ApiResponse(200,"Task date edited successfully",dailyTask,));
});

const editTaskDetails=asyncHandler(async(req,res)=>{
    const taskId=req.params.taskId;
    const {name , description} = req.body;

    if(!name && !description){
        throw new ApiError(400,"Atleast one field is required");
    }

    const dailyTask = await DailyTask.findByIdAndUpdate(taskId,{$set:{name,description}},{new:true});

    return res
    .status(200)
    .json(new ApiResponse(200,"Task details edited successfully",dailyTask));
});

const deleteTask=asyncHandler(async(req,res)=>{
    const taskId=req.params.taskId;

    const dailyTask = await DailyTask.findByIdAndDelete(taskId);
    if(!dailyTask){
        throw new ApiError(400,"Task not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Task deleted successfully",{}));
});

const todaysTask=asyncHandler(async(req,res)=>{
    const user=req.user?._id;

    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setUTCHours(23, 59, 59, 999);

    const tasks = await DailyTask.find({
        user,
        date: {
            $gte: startOfToday,
            $lte: endOfToday
        }
    });
    return res
    .status(200)
    .json(new ApiResponse(200, "Today's tasks fetched successfully", tasks));
});

const getAllTask = asyncHandler(async(req,res)=>{
    const user = req.user?._id;

    const tasks = await DailyTask.find({
        user
    });

    return res
    .status(200)
    .json(new ApiResponse(200,"All tasks fetched successfully",tasks));
});

export {
    addDailyTask, 
    editTaskDate, 
    editTaskDetails, 
    deleteTask,
    todaysTask,
    getAllTask
}