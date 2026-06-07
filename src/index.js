import dotenv from "dotenv";
import connnectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path:'./.env'
})

connnectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error on app: ",error);
    })
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("Error connecting to MongoDB",error);
})