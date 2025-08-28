import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true, index: true },
  course: { type: mongoose.Types.ObjectId, ref: 'Course', required: true, index: true },
  enrollment: { type: mongoose.Types.ObjectId, ref: 'Enrollment', default: null },
  
  issuedAt: { type: Date, default: Date.now },
  certificateId: { type: String, required: true, unique: true }, // unik untuk verifikasi
  grade: { type: String, default: null },
  remarks: { type: String, trim: true, default: '' },
  fileUrl: { type: String, trim: true, default: '' } // bisa untuk simpan link PDF sertifikat
  
}, {
  timestamps: true
});

// Unik per user + course
certificateSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model('Certificate', certificateSchema);
