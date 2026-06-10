import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use(express.static("public"));

app.use(cookieParser());

//import routes
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import dailyTaskRouter from "./routes/dailyTask.routes.js";
import userSettingsRouter from "./routes/userSettings.routes.js";
import projectTaskRouter from "./routes/projectTask.routes.js";

//routes declaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/projects",projectRouter);
app.use("/api/v1/projectTasks",projectTaskRouter);
app.use("/api/v1/dailyTasks",dailyTaskRouter);
app.use("/api/v1/userSettings",userSettingsRouter);

export {app}