import express from 'express';
import {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificate.controller.js';

const router = express.Router();

router.post('/sertifi', createCertificate);
router.get('/sertifi', getCertificates);
router.get('/sertifi/:id', getCertificateById);
router.put('/sertifi/:id', updateCertificate);
router.delete('/sertifi/:id', deleteCertificate);

export default router;
