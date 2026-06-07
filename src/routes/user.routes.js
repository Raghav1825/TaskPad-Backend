import { Router } from "express";
import { 
    registerUser,
    loginUser, 
    logOutUser, 
    refreshAccessToken , 
    getCurrentUser,
    changeAccountDtails,
    changeProfileImage,
    changeCurrentPassword,
    deleteAccount
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"profileImage",
            maxCount:1
        }
    ]),
    registerUser    
)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logOutUser)
router.route("/refresh-token").post(verifyJWT,refreshAccessToken)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account-details").patch(verifyJWT,changeAccountDtails)
router.route("/update-profile-image").patch(verifyJWT,upload.fields([
    {
        name:"profileImage",
        maxCount:1
    }
]),changeProfileImage)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/delete-account").delete(verifyJWT,deleteAccount)
export default router;