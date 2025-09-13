// controllers/certificateController.js
import Certificate from '../models/Certificate.js'
import Course from '../models/Course.js'
import mongoose from 'mongoose'
import multer from 'multer'
import { uploadToS3 } from '../services/storageService.js'

// ========= Multer =========
const upload = multer({ storage: multer.memoryStorage() })
export const uploadMiddleware = upload.single('file')

// ========= Helper Response =========
const sendResponse = (res, status, success, data = null, message = '') => {
  return res.status(status).json({ success, data, message })
}

// ========== CLIENT ==========

// Upload sertifikat (Client)
export const uploadCertificate = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return sendResponse(res, 401, false, null, 'Unauthorized: user not found')
    }
    const user = req.user._id
    const { course } = req.body

    // --- Validasi ObjectId course
    if (!mongoose.Types.ObjectId.isValid(course)) {
      return sendResponse(res, 400, false, null, 'Invalid course ID')
    }

    // --- Cek course ada atau tidak
    const existingCourse = await Course.findById(course)
    if (!existingCourse) {
      return sendResponse(res, 404, false, null, 'Course not found')
    }

    // --- Cek apakah sertifikat sudah pernah dibuat
    const alreadyCert = await Certificate.findOne({ user, course })
    if (alreadyCert) {
      return sendResponse(
        res,
        409,
        false,
        alreadyCert,
        'Certificate already exists for this course'
      )
    }

    // --- Pastikan file ada
    if (!req.file) {
      return sendResponse(res, 400, false, null, 'Certificate file is required')
    }

    // --- Validasi tipe file
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg']
    if (!allowedTypes.includes(req.file.mimetype)) {
      return sendResponse(
        res,
        400,
        false,
        null,
        'Invalid file type. Only PDF, JPG, or PNG are allowed'
      )
    }

    // --- Upload ke S3
    const fileUrl = await uploadToS3(req.file.buffer, req.file.mimetype)

    // --- Buat sertifikat baru
    const certificate = new Certificate({
      user,
      course,
      fileUrl,
      issuedAt: new Date()
    })

    await certificate.save()

    return sendResponse(
      res,
      201,
      true,
      certificate,
      'Certificate uploaded successfully'
    )
  } catch (err) {
    console.error(err)
    return sendResponse(res, 500, false, null, err.message || 'Server error')
  }
}

// Ambil semua sertifikat milik user login
export const getMyCertificates = async (req, res) => {
  try {
    const user = req.user._id

    const certificates = await Certificate.find({ user })
      .populate('course', 'title')
      .sort({ createdAt: -1 })

    return sendResponse(
      res,
      200,
      true,
      certificates,
      'My certificates fetched successfully'
    )
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error')
  }
}

// Ambil sertifikat berdasarkan ID
export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid certificate ID')
    }

    const cert = await Certificate.findById(id)
      .populate('user', 'fullName email')
      .populate('course', 'title')

    if (!cert) {
      return sendResponse(res, 404, false, null, 'Certificate not found')
    }

    return sendResponse(
      res,
      200,
      true,
      cert,
      'Certificate fetched successfully'
    )
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error')
  }
}

// ========== ADMIN ==========

// Ambil semua sertifikat (Admin)
export const getCertificates = async (req, res) => {
  try {
    const { page = 1, limit = 10, courseId, userId } = req.query
    const query = {}
    if (courseId) query.course = courseId
    if (userId) query.user = userId

    const certificates = await Certificate.find(query)
      .populate('user', 'fullName email')
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const total = await Certificate.countDocuments(query)

    return sendResponse(
      res,
      200,
      true,
      {
        certificates,
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit)
      },
      'Certificates fetched successfully'
    )
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error')
  }
}

// Update sertifikat (Admin)
export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid certificate ID')
    }

    const cert = await Certificate.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    if (!cert) {
      return sendResponse(res, 404, false, null, 'Certificate not found')
    }

    return sendResponse(
      res,
      200,
      true,
      cert,
      'Certificate updated successfully'
    )
  } catch (err) {
    return sendResponse(
      res,
      400,
      false,
      null,
      err.message || 'Invalid update data'
    )
  }
}

// Delete sertifikat (Admin) — hard delete
export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid certificate ID')
    }

    const cert = await Certificate.findByIdAndDelete(id)
    if (!cert) {
      return sendResponse(res, 404, false, null, 'Certificate not found')
    }

    return sendResponse(
      res,
      200,
      true,
      null,
      'Certificate deleted successfully'
    )
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error')
  }
}
