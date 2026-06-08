import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    addDailyTask, 
    editTaskDate, 
    editTaskDetails, 
    deleteTask,
    todaysTask,
    getAllTask
} from "../controllers/dailyTask.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/add-task").post(addDailyTask);
router.route("/edit-task/:taskId").patch(editTaskDetails);
router.route("/edit-task-date/:taskId").patch(editTaskDate);
router.route("/delete-task/:taskId").delete(deleteTask);
router.route("/today").get(todaysTask);
router.route("/all-tasks").get(getAllTask);

export default router;