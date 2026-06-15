import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getUserSettings,
    updateUserSettings,
    initlizeUserSetting
} from "../controllers/userSettings.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/initialize").post(initlizeUserSetting);
router.route("/get-settings").get(getUserSettings);
router.route("/update-settings").patch(updateUserSettings);

export default router;