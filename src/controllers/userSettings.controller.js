import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserSettings } from "../models/userSettings.model.js";

const getUserSettings=asyncHandler(async(req,res)=>{
    const user = req.user?._id;
    const settings = await UserSettings.findOne({
        user
    });
    return res
    .status(200)
    .json(new ApiResponse(200,settings,"User settings fetched successfully"));
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
    .json(new ApiResponse(200,settings,"User settings updated successfully"));
})

export {
    getUserSettings,
    updateUserSettings
}