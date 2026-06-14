import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addDailyTask, 
    editTaskDate, 
    editTaskDetails, 
    deleteTask,
    todaysTask,
    getAllTask,
    editTaskStatus
} from "../controllers/dailyTask.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/add-task").post(addDailyTask);
router.route("/edit-task/:taskId").patch(editTaskDetails);
router.route("/edit-task-date/:taskId").patch(editTaskDate);
router.route("/delete-task/:taskId").delete(deleteTask);
router.route("/today").get(todaysTask);
router.route("/all-tasks").get(getAllTask);
router.route("/edit-task-status/:taskId").patch(editTaskStatus);
export default router;