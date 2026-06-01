import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connnectDB=async()=>{
    try{
        const conectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected! DB Hoste: ${conectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MongoDB connection error: ",error);
        process.exit(1);
    }
}
export default connnectDB