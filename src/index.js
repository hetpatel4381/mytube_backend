import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

const app = express();
dotenv.config();

connectDB()
  .then(
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\n Server is running at port ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("MongoDB connection failed !!! ", e);
  });

/*
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
    throw error;
    // console.error(error);
  }
})();
*/
