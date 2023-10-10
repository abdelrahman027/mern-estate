import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes.js';
dotenv.config();

const app = express();

app.use(userRoutes);






mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //server
    app.listen(3000, () => {
      console.log("server is running on 3000");
    });
  })
  .catch((err) => console.log(err));
