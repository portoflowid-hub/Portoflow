// routes/certificateRoutes.js
import express from 'express'
import {
  uploadCertificate,
  getMyCertificates,
  getCertificateById,
  getCertificates,
  updateCertificate,
  deleteCertificate,
  uploadMiddleware
} from '../controller/certificateController.js'
import verifyToken from '../middleware/auth.js'
import { authorizeRoles } from '../middleware/roleCheck.js'

const router = express.Router()

// ========== CLIENT ==========

// Upload sertifikat (hanya user login)
router.post(
  '/api/certificates/upload',
  verifyToken,
  uploadMiddleware,
  uploadCertificate
)

// Ambil semua sertifikat milik user login
router.get('/api/certificates/me', verifyToken, getMyCertificates)

// Ambil sertifikat berdasarkan ID (Client/Admin)
router.get('/api/certificates/:id', verifyToken, getCertificateById)

// ========== ADMIN ==========

// Ambil semua sertifikat
router.get(
  '/api/certificates',
  verifyToken,
  authorizeRoles('admin'),
  getCertificates
)

// Update sertifikat
router.put(
  '/api/certificates/:id',
  verifyToken,
  authorizeRoles('admin'),
  updateCertificate
)

// Hapus sertifikat
router.delete(
  '/api/certificates/:id',
  verifyToken,
  authorizeRoles('admin'),
  deleteCertificate
)

export default router
