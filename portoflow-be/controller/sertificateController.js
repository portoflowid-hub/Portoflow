import Certificate from '../models/Sertificate.js'
import User from '../models/User.js'
import Course from '../models/Course.js'
import Enrollment from '../models/Enrollment.js'
import mongoose from 'mongoose'

// Response formatter
const sendResponse = (res, status, success, data = null, message = '') => {
  return res.status(status).json({ success, data, message })
}

// ========== CLIENT ==========

// Upload sertifikat (Client)
export const uploadCertificate = async (req, res) => {
  try {
    const { course, enrollment, fileUrl } = req.body
    const user = req.user._id

    // Validasi ObjectId
    if (!mongoose.Types.ObjectId.isValid(course)) {
      return sendResponse(res, 400, false, null, 'Invalid course ID')
    }

    // Cek course
    const existingCourse = await Course.findById(course)
    if (!existingCourse)
      return sendResponse(res, 404, false, null, 'Course not found')

    // Cek enrollment jika ada
    if (enrollment) {
      if (!mongoose.Types.ObjectId.isValid(enrollment)) {
        return sendResponse(res, 400, false, null, 'Invalid enrollment ID')
      }

      const existingEnrollment = await Enrollment.findById(enrollment)
      if (!existingEnrollment)
        return sendResponse(res, 404, false, null, 'Enrollment not found')

      if (existingEnrollment.user.toString() !== user.toString()) {
        return sendResponse(
          res,
          403,
          false,
          null,
          'Enrollment does not belong to this user'
        )
      }

      if (existingEnrollment.status !== 'completed') {
        return sendResponse(
          res,
          400,
          false,
          null,
          'User has not completed this course yet'
        )
      }
    }

    // Cek duplikat sertifikat
    const alreadyCert = await Certificate.findOne({
      user,
      course,
      isDeleted: false
    })
    if (alreadyCert) {
      return sendResponse(
        res,
        409,
        false,
        alreadyCert,
        'Certificate already exists for this course'
      )
    }

    // Buat sertifikat baru
    const certificate = new Certificate({
      user,
      course,
      enrollment,
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
    return sendResponse(res, 500, false, null, err.message || 'Server error')
  }
}

// Ambil semua sertifikat milik user login
export const getMyCertificates = async (req, res) => {
  try {
    const user = req.user._id

    const certificates = await Certificate.find({ user, isDeleted: false })
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

// Ambil sertifikat berdasarkan ID (Client/Admin)
export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid certificate ID')
    }

    const cert = await Certificate.findById(id)
      .populate('user', 'fullName email')
      .populate('course', 'title')

    if (!cert || cert.isDeleted)
      return sendResponse(res, 404, false, null, 'Certificate not found')

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

// Ambil semua sertifikat (Admin) dengan pagination & filter
export const getCertificates = async (req, res) => {
  try {
    const { page = 1, limit = 10, courseId, userId } = req.query
    const query = { isDeleted: false }

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

    if (!cert || cert.isDeleted)
      return sendResponse(res, 404, false, null, 'Certificate not found')

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

// Delete sertifikat (Admin)
export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid certificate ID')
    }

    const cert = await Certificate.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    )

    if (!cert)
      return sendResponse(res, 404, false, null, 'Certificate not found')

    return sendResponse(
      res,
      200,
      true,
      null,
      'Certificate deleted successfully (soft delete)'
    )
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error')
  }
}
