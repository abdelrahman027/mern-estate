import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();

const app = express();
app.use(express.json())

app.use('/api/user',userRoutes);


app.use('/api/auth',authRoutes)



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //server
    app.listen(3000, () => {
      console.log("server is running on 3000");
    });
  })
  .catch((err) => console.log(err));
