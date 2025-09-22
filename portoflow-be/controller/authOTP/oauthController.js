import 'dotenv/config';
import {google} from 'googleapis';
import User from '../../models/user/User.js';

console.log("CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "ada" : "kosong");
console.log("REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI);
console.log('GOOGLE_REFRESH_TOKEN', process.env.GOOGLE_REFRESH_TOKEN);
console.log('EMAIL USER', process.env.EMAIL_USER);

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const authGoogle = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes
    });
    res.redirect(url);
}

const authGoogleCallback = async (req, res) => {
    try {
        console.log('Query: ', req.query);
        const {code} = req.query;
        const {tokens} = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        if (tokens.refresh_token) {
            console.log('Refresh Token: ', tokens.refresh_token);
        } else {
            console.log('Tidak ada refresh token, mungkin user sudah pernah authorize');
        }

        res.send('Authentication successfully');
    } catch (err) {
        console.error('Google OAuth error: ', err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
}

export {authGoogle, authGoogleCallback};