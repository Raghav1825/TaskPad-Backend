import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getUserSettings,
    updateUserSettings
} from "../controllers/userSettings.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/get-settings").get(getUserSettings);
router.route("/update-settings").patch(updateUserSettings);

export default router;