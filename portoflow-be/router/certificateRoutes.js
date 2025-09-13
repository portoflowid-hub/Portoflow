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
import verifyToken from '../middleware/auth.js'   // <--- IMPORT MIDDLEWARE AUTH

const router = express.Router()

// ========== CLIENT ==========
// Upload sertifikat (pakai middleware multer + auth)
router.post(
  '/api/certificates/upload',
  verifyToken,          // <--- WAJIB supaya req.user keisi
  uploadMiddleware,
  uploadCertificate
)

// Ambil semua sertifikat milik user login
router.get('/api/certificates/me', verifyToken, getMyCertificates)

// Ambil sertifikat berdasarkan ID (Client/Admin)
router.get('/api/certificates/:id', verifyToken, getCertificateById)

// ========== ADMIN ==========
router.get('/api/certificates', verifyToken, getCertificates)
router.put('/api/certificates/:id', verifyToken, updateCertificate)
router.delete('/api/certificates/:id', verifyToken, deleteCertificate)

export default router
