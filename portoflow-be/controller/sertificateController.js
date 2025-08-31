import Certificate from '../models/Sertificate.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// Helper response formatter
const sendResponse = (res, status, success, data = null, message = '') => {
  return res.status(status).json({ success, data, message });
};

// CREATE
export const createCertificate = async (req, res) => {
  try {
    const { user, course, enrollment, grade, remarks, fileUrl } = req.body;

    // 1. Validasi user
    const existingUser = await User.findById(user);
    if (!existingUser) return sendResponse(res, 404, false, null, 'User not found');

    // 2. Validasi course
    const existingCourse = await Course.findById(course);
    if (!existingCourse) return sendResponse(res, 404, false, null, 'Course not found');

    // 3. Validasi enrollment (opsional, jika ada)
    if (enrollment) {
      const existingEnrollment = await Enrollment.findById(enrollment);
      if (!existingEnrollment) return sendResponse(res, 404, false, null, 'Enrollment not found');

      // pastikan user di enrollment = user yang dimaksud
      if (existingEnrollment.user.toString() !== user) {
        return sendResponse(res, 400, false, null, 'Enrollment does not belong to this user');
      }

      // pastikan enrollment status sudah "completed"
      if (existingEnrollment.status !== 'completed') {
        return sendResponse(res, 400, false, null, 'User has not completed this course yet');
      }
    }

    // 4. Cek apakah sertifikat sudah ada untuk user + course
    const alreadyCert = await Certificate.findOne({ user, course });
    if (alreadyCert) {
      return sendResponse(res, 400, false, alreadyCert, 'Certificate already exists for this course');
    }

    // 5. Buat sertifikat baru
    const certificate = new Certificate({
      user,
      course,
      enrollment,
      grade,
      remarks,
      fileUrl,
      certificateId: `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    });

    await certificate.save();
    return sendResponse(res, 201, true, certificate, 'Certificate created successfully');
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error');
  }
};

// READ ALL
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('user', 'fullName email')
      .populate('course', 'title');

    return sendResponse(res, 200, true, certificates, 'Certificates fetched successfully');
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error');
  }
};

// READ ONE
export const getCertificateById = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id)
      .populate('user', 'fullName email')
      .populate('course', 'title');
    
    if (!cert) return sendResponse(res, 404, false, null, 'Certificate not found');

    return sendResponse(res, 200, true, cert, 'Certificate fetched successfully');
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error');
  }
};

// UPDATE
export const updateCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cert) return sendResponse(res, 404, false, null, 'Certificate not found');

    return sendResponse(res, 200, true, cert, 'Certificate updated successfully');
  } catch (err) {
    return sendResponse(res, 400, false, null, err.message || 'Invalid update data');
  }
};

// DELETE
export const deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);

    if (!cert) return sendResponse(res, 404, false, null, 'Certificate not found');

    return sendResponse(res, 200, true, null, 'Certificate deleted successfully');
  } catch (err) {
    return sendResponse(res, 500, false, null, err.message || 'Server error');
  }
};
