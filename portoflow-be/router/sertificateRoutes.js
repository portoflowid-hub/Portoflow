import express from 'express'
import {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate
} from '../controller/sertificateController.js'

const router = express.Router()

// sertifikat agar client bisa ngupload sertifikat yang sudah dia dapatkan

// Client
router.post('/certificates/upload', uploadCertificate)
router.get('/certificates/me', getMyCertificates)
router.get('/certificates/:id', getCertificateById) //Client/Admin

// Admin
router.get('/certificates', getCertificates)
router.put('/certificates/:id', updateCertificate)
router.delete('/certificates/:id', deleteCertificate)

export default router
