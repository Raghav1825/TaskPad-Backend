import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccesTokenAndRefreshToken=async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    }catch(error){
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req,res)=>{
    const {fullName,email,phoneNumber,password}=req.body;
    
    if(
        [fullName,email,phoneNumber,password].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{email}, {phoneNumber}]
    })

    if(existingUser){
        throw new ApiError(400,"User already exists")
    }
    const profileImageLocalPath = req.files?.profileImage[0].path;
    if(!profileImageLocalPath){
        throw new ApiError(400,"Profile image is required")
    }
    const profileImage = await uploadOnCloudinary(profileImageLocalPath);

    const user = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        profileImage: profileImage?.url||" "
    });
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating user")
    }
    
    return res
    .status(201)
    .json(
        new ApiResponse(201,"User registered successfully",createdUser)
    )
});

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    
    if(!email&&!password){
        throw new ApiError(400,"Email and password are required")
    }
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid password")
    }
    const {accessToken,refreshToken} = await generateAccesTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,"User logged in successfully",loggedInUser)
    )
});

const logOutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken:1
            }
        },
        {
            new: true
        }
    )
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,"User logged out successfully",{})
    )
});

const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorised request")
    }

    try{
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
        if(user.refreshToken !== incomingRefreshToken){
            throw new ApiError(401,"Refresh token is expired or used")
        }
        const {accessToken,refreshToken} = await generateAccesTokenAndRefreshToken(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(200,"Refresh token generated successfully",loggedInUser)
        )
    }
    catch(error){
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }
    
});

const changeAccountDtails = asyncHandler(async (req,res)=>{
    const {fullName,email,phoneNumber}=req.body;
    if(!fullName){
        throw new ApiError(400,"Full name is required")
    }
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    if(!phoneNumber){
        throw new ApiError(400,"Phone number is required")
    }

   const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
        $set:{
            fullName,
            email,
            phoneNumber
        }
    },
    {
        new: true
    }
   ).select("-password -refreshToken")
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Account details changed successfully",user)
    )
});

const changeCurrentPassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword}=req.body;
    
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid password")
    }
    user.password = newPassword;
    await user.save({validateBeforeSave:false});
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Password changed successfully",user)
    )
});

const changeProfileImage = asyncHandler(async(req,res)=>{
    const profileImageLocalPath = req.files?.path;
    if(!profileImageLocalPath){
        throw new ApiError(400,"Profile Image file is missing")
    }
    const user = await User.findById(req.user._id);
    if(user.profileImage){
        await deleteOnCloudinary(user.profileImage);
    }
    const profileImage = await uploadOnCloudinary(profileImageLocalPath);
    if(!profileImage){
        throw new ApiError(400,"Failed to upload profile image")
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                profileImage: profileImage?.url || ""
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Profile image changed successfully",updatedUser)
    )
});


export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    changeAccountDtails,
    changeProfileImage
}
