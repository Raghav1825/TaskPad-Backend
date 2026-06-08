import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createProject,
    editProjectDetails,
    editProjectStatus,
    deleteProject,
    getProjectDetails,
    addProjectMembers,
    deleteProjectMember,
    getAllProjects
} from "../controllers/project.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-project").post(createProject);
router.route("/edit-project-details/:projectId").patch(editProjectDetails);
router.route("/edit-project-status/:projectId").patch(editProjectStatus);
router.route("/delete-project/:projectId").delete(deleteProject);
router.route("/get-project-details/:projectId").get(getProjectDetails);
router.route("/add-project-members/:projectId").post(addProjectMembers);
router.route("/delete-project-member/:projectId").delete(deleteProjectMember);
router.route("/all-projects").get(getAllProjects);

export default router;