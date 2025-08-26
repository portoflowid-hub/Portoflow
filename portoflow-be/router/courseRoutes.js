import express from 'express';
import { 
    getAllCourses, 
    getCourseById, 
    createCourse, 
    updateCourse, 
    deleteCourse 
} from '../controller/courseController.js';

// PERBAIKAN DI SINI: Hapus kurung kurawal {}
import verifyToken from '../middleware/auth.js'; 

const courseRouter = express.Router();

// Rute untuk mendapatkan semua kursus (publik)
courseRouter.get('/api/courses', getAllCourses);

// Rute untuk mendapatkan satu kursus berdasarkan ID (publik)
courseRouter.get('/api/courses/:id', getCourseById);

// Rute yang memerlukan otentikasi
courseRouter.post('/api/courses', verifyToken, createCourse);
courseRouter.put('/api/courses/:id', verifyToken, updateCourse);
courseRouter.delete('/api/courses/:id', verifyToken, deleteCourse);

export default courseRouter;