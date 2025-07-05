import express from 'express';
import { getAccessToken } from '../services/auth.service.js';

export const authRoute = express.Router();

authRoute.get('/login', (req, res) => {
    {/* This will render the landing page */}
    res.redirect(`${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${process.env.KEYCLOAK_CLIENT_ID}&response_type=code&scope=openid&redirect_uri=${process.env.KEYCLOAK_REDIRECT_URI}`);
});

authRoute.get('/callback', async(req, res) => {
    {/* This will handle the callback from Keycloak after authentication */}
    const code = req.query.code;
    const accessToken = await getAccessToken(code);
    req.headers.authorization = `Bearer ${accessToken}`;
    res.redirect('/dashboard');
});