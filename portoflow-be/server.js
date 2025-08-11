import express from 'express';
import dotenv from 'dotenv';
import connectedDB from './config/db.js';
import userRouter from './router/userRoutes.js';
import adminRouter from './router/adminRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

await connectedDB();
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(adminRouter);

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});