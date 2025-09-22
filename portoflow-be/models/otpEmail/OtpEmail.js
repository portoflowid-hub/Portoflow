import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;