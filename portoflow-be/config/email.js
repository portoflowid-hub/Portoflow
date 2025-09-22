import { google } from "googleapis";
import 'dotenv/config';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

const sendOtpEmail = async (toEmail, otp) => {
    const rawMessage = [
        `From: ${process.env.EMAIL_USER}`,
        `To: ${toEmail}`,
        "Subject: Kode Verifikasi OTP Anda",
        "Content-Type: text/html; charset=utf-8",
        "",
        `<p>Halo,</p><p>Kode OTP Anda adalah: <b>${otp}</b></p><p>Kode ini berlaku selama 10 menit.</p>`,
    ].join("\n");

    const encodedMessage = Buffer.from(rawMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    await gmail.users.messages.send({
        userId: "me",
        requestBody: {
        raw: encodedMessage,
        },
    });

    console.log("OTP berhasil dikirim ke", toEmail);
};

export {sendOtpEmail};
