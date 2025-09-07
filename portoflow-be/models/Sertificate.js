import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const certificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },
    enrollment: {
      type: mongoose.Types.ObjectId,
      ref: 'Enrollment',
      default: null
    },

    issuedAt: { type: Date, default: Date.now },
    certificateId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4
    },
    fileUrl: { type: String, trim: true, required: true }
  },
  {
    timestamps: true
  }
)

// Unik per user + course
certificateSchema.index({ user: 1, course: 1 }, { unique: true })
// Untuk verifikasi cepat
certificateSchema.index({ certificateId: 1 })

export default mongoose.model('Certificate', certificateSchema)
