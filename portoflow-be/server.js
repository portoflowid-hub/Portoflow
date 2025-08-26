import express from 'express';
import dotenv from 'dotenv';
import connectedDB from './config/db.js';
import userRouter from './router/userRoutes.js';
import adminRouter from './router/adminRoutes.js';
import courseRouter from './router/courseRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

// diubdah ke 3000 agar tidak bentrol dengan frontend
const PORT = process.env.PORT || 5000;

// Pindahkan CORS ke bagian atas sebelum middleware lainnya
// Ini memastikan semua permintaan yang masuk akan diperiksa kebijakannya terlebih dahulu
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
// middleware lainnya
app.use(express.json());
app.use(cookieParser());

// router setelah middleware
app.use(userRouter);
app.use(adminRouter);
app.use(courseRouter);

// Panggil koneksi DB
await connectedDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});