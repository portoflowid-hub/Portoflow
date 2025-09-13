import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const certificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enrollment',
      default: null
    },

    issuedAt: { type: Date, default: Date.now },
    certificateId: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4()   // ✅ fungsi, bukan langsung uuidv4
    },

    fileUrl: { type: String, trim: true, required: true }
  },
  {
    timestamps: true
  }
)

// ✅ Unik per user + course (1 user ga bisa punya 2 sertifikat utk course sama)
certificateSchema.index({ user: 1, course: 1 }, { unique: true })

export default mongoose.model('Certificate', certificateSchema)
