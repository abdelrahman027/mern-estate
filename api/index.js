import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();

const app = express();
app.use(express.json())

app.use('/api/user', userRoutes);


app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //servers
    app.listen(3000, () => {
      console.log("server is running on 3000");
    });
  })
  .catch((err) => console.log(err));
