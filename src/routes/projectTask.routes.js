import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createProjectTask,
    updateTaskStatus,
    getProjectTasks,
    editProjectTask,
    deleteProjectTask
} from "../controllers/projectTask.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-task/:projectId").post(createProjectTask);
router.route("/update-task-status/:taskId").patch(updateTaskStatus);
router.route("/get-project-tasks/:projectId").get(getProjectTasks);
router.route("/edit-project-task/:taskId").patch(editProjectTask);
router.route("/delete-project-task/:taskId").delete(deleteProjectTask);

export default router;