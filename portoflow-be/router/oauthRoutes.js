import express from 'express';
import { authGoogle, authGoogleCallback } from '../controller/authOTP/oauthController.js';

const oauthRouter = express.Router();

oauthRouter.get('/auth/google', authGoogle);
oauthRouter.get('/auth/google/callback', authGoogleCallback);

export default oauthRouter;