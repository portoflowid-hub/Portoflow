import express from 'express';
import { 
    getAllCourses, 
    getCourseById, 
    createCourse, 
    updateCourse, 
    deleteCourse,
    listCourseStudents
} from '../controller/courseController.js';

import verifyToken from '../middleware/auth.js'; 

const courseRouter = express.Router();

// Rute publik
courseRouter.get('/api/courses', getAllCourses);
courseRouter.get('/api/courses/:id', getCourseById);

// Rute otentikasi
courseRouter.post('/api/courses', verifyToken, createCourse);
courseRouter.put('/api/courses/:id', verifyToken, updateCourse);
courseRouter.delete('/api/courses/:id', verifyToken, deleteCourse);

// Rute untuk ambil daftar mahasiswa yang terdaftar dalam kursus tertentu
courseRouter.get('/api/courses/:id/students', verifyToken, listCourseStudents);

export default courseRouter;
