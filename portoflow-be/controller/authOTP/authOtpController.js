import User from '../../models/user/User.js';
import OTP from '../../models/otpEmail/OtpEmail.js';
import otpGenerator from 'otp-generator';
import { sendOtpEmail } from '../../config/email.js';
import jwt from 'jsonwebtoken';

//request otp code
const requestOtp = async (req, res) => {
    try {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email is required'
            });
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        //hapus OTP lama
        await OTP.deleteMany({userId: user._id});

        //create new OTP
        const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false});
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //expires on 10 minutes

        //save otp to database
        await OTP.create({userId: user._id, otp, expiresAt});

        //send otp via email
        await sendOtpEmail(email, otp);

        res.status(200).json({
            status: 'success',
            message: 'OTP sent to your email'
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

//verify otp
const verifyOtp = async (req, res) => {
    try {
        const {email, otp} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        // Find a valid OTP that has not expired
        const otpRecord = await OTP.findOne({
            userId: user._id,
            otp,
            expiresAt: {$gt: new Date()} //check whether it has expired
        });

        if (!otpRecord) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid or expired OTP'
            });
        }

        //delete OTP after success
        await OTP.deleteOne({_id: otpRecord._id});

        //create jwt for login
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            status: 'success',
            message: 'Login successfull',
            token
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

export {requestOtp, verifyOtp};