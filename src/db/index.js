import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    // console.log(connectionInstance.connection);

    console.log(
      `\n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}/${connectionInstance.connection.port}:${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log("MONGODB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
