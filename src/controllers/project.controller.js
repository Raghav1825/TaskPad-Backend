import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const createProject = asyncHandler(async (req, res) => {
    const { projectName, projectDescription } = req.body;
    if (!projectName) {
        throw new ApiError(400, "Title is required")
    }
    const project = await Project.create({
        projectName,
        projectDescription,
        owner: req.user?._id,
        projectStatus: "Not Started"
    });
    return res
        .status(201)
        .json(
            new ApiResponse(201, "Project created successfully", project)
        )
});


const editProjectDetails = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { projectName, projectDescription } = req.body;
    if (!projectId) {
        throw new ApiError(400, "Project ID is required")
    }
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
    if (project.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to edit this project")
    }
    project.projectName = projectName;
    project.projectDescription = projectDescription;
    await project.save();
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Project updated successfully", project)
        )
});

const editProjectStatus = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { projectStatus } = req.body;
    if (!projectId) {
        throw new ApiError(400, "Project ID is required")
    }
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
    if (project.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to edit this project")
    }
    project.projectStatus = projectStatus;
    await project.save();
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Project status updated successfully", project)
        )
});

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    if (!projectId) {
        throw new ApiError(400, "Project ID is required")
    }
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
    if (project.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this project")
    }
    await project.deleteOne();
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Project deleted successfully", {})
        )
});

const getProjectDetails = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    if (!projectId) {
        throw new ApiError(400, "Project ID is required")
    }
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
    const isOwner = project.owner.toString() === req.user?._id.toString();
    const isMember = project.members.some(
        (memberId) => memberId.toString() === req.user?._id.toString()
    );
    if (!isOwner && !isMember) {
        throw new ApiError(403, "You are not authorized to view this project");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Project details", project)
        )
});

const addProjectMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (project.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to add members");
    }

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
        throw new ApiError(404, "User with this email not found");
    }

    if (project.members.includes(userToAdd._id)) {
        throw new ApiError(400, "User is already a member of this project");
    }
    project.members.push(userToAdd._id);
    await project.save();
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Member added successfully", project)
        );
});

const deleteProjectMember = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }
    if (project.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this member");
    }
    const userToRemove = await User.findOne({ email });
    if (!userToRemove) {
        throw new ApiError(404, "User not found");
    }
    if (!project.members.includes(userToRemove._id)) {
        throw new ApiError(400, "User is not a member of this project");
    }
    project.members = project.members.filter((member) => member.toString() !== userToRemove._id.toString());
    await project.save();
    return res
        .status(200)
        .json(
            new ApiResponse(200, "Member deleted successfully", project)
        );
});

const getAllProjects = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const projects = await Project.find(
        {
            $or: [
                { owner: req.user._id },
                { members: req.user._id }
            ]
        }
    );
    if (!projects) {
        throw new ApiError(400, "No projects found for this user");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, "All projects", projects)
        );
});

export {
    createProject,
    editProjectDetails,
    editProjectStatus,
    deleteProject,
    getProjectDetails,
    addProjectMembers,
    deleteProjectMember,
    getAllProjects
}
