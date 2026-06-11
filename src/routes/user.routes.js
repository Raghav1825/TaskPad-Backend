import { Router } from "express";
import { 
    registerUser,
    loginUser, 
    logOutUser, 
    refreshAccessToken , 
    getCurrentUser,
    changeAccountDetails,
    changeProfileImage,
    changeCurrentPassword,
    deleteAccount,
    getUserById
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
router.route("/update-account-details").patch(verifyJWT,changeAccountDetails)
router.route("/update-profile-image").patch(verifyJWT,upload.single("profileImage"),changeProfileImage)
router.route("/change-password").patch(verifyJWT,changeCurrentPassword)
router.route("/delete-account").delete(verifyJWT,deleteAccount)
router.route("/:id").get(verifyJWT,getUserById)
export default router;