import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectedDB } from "./db.js"; // sesuaikan path
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import courseRouter from "./routes/course.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS (pakai env untuk production)
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  credentials: true,
}));

// Middleware lain
app.use(express.json());
app.use(cookieParser());

// Router
app.use(userRouter);
app.use(adminRouter);
app.use(courseRouter);

// Jalankan server setelah DB connect
const start = async () => {
  try {
    await connectedDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

start();
