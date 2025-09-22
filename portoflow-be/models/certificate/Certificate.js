import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  // enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', default: null }, // optional
  issuedAt: { type: Date, default: Date.now },
  certificateId: { type: String, required: true, unique: true, default: () => uuidv4() },
  fileUrl: { type: String, trim: true, required: true }
}, { timestamps: true });

// 1 user hanya bisa punya 1 sertifikat per course
certificateSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model('Certificate', certificateSchema);
