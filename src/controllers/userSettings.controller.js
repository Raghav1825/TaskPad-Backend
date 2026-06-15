import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserSettings } from "../models/userSettings.model.js";

const initlizeUserSetting=asyncHandler(async(req,res)=>{
    const user = req.user?._id;
    if(!user){
        throw new ApiError(400,"User does not exist");
    }
    const userSettings=await UserSettings.findOne({
        user
    })
    if(userSettings){
        throw new ApiError(400,"User settings already initialized");
    }

    const settings = await UserSettings.create({
        user,
        theme:"dark"
    });
    return res
    .status(200)
    .json(new ApiResponse(200,"User settings initialized successfully",settings));
})

const getUserSettings=asyncHandler(async(req,res)=>{
    const user = req.user?._id;
    const settings = await UserSettings.findOne({
        user
    });
    return res
    .status(200)
    .json(new ApiResponse(200,"User settings fetched successfully",settings));
})

const updateUserSettings=asyncHandler(async(req,res)=>{
    const user = req.user?._id;
    const {theme} = req.body;
    if(!user){
        throw new ApiError(400,"User does not exist");
    }
    const settings = await UserSettings.findOneAndUpdate({
        user
    },{$set:{theme}},{new:true});
    return res
    .status(200)
    .json(new ApiResponse(200,"User settings updated successfully",settings));
})

export {
    getUserSettings,
    updateUserSettings,
    initlizeUserSetting
}