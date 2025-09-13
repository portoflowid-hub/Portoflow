// routes/enrollmentRoutes.js
import express from 'express'
import {
  enrollCourse,
  unenrollCourse,
  listCourseStudents,
  getMyEnrollments,
  updateEnrollment
} from '../controller/enrollmentController.js'
import verifyToken from '../middleware/auth.js'
import { authorizeRoles } from '../middleware/roleCheck.js'

const router = express.Router()

// ======================
// Student actions
// ======================

// Enroll course
router.post('/api/courses/:id/enroll', verifyToken, enrollCourse)

// Unenroll course
router.delete('/api/courses/:id/enroll', verifyToken, unenrollCourse)

// Get all my enrollments
router.get('/api/my-enrollments', verifyToken, getMyEnrollments)

// ======================
// Admin / Instructor actions
// ======================

// List students in a course
router.get(
  '/api/courses/:id/students',
  verifyToken,
  authorizeRoles('admin', 'instructor', 'ta'),
  listCourseStudents
)

// Update enrollment (role/status/progress/grade)
router.put(
  '/api/enrollments/:enrollmentId',
  verifyToken,
  authorizeRoles('admin', 'instructor'),
  updateEnrollment
)

export default router
