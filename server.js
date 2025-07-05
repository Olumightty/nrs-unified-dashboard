import express from 'express';
import dotenv from 'dotenv';
import { dashboardRoute } from './routes/dashboard.route.js';
import session from 'express-session';
import KeycloakConnect from 'keycloak-connect';
import morgan from 'morgan';

dotenv.config();
const PORT = process.env.PORT || 9002;
const app = express();

export const memoryStore = new session.MemoryStore();

const kcConfig = {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": process.env.KEYCLOAK_URL,
    "ssl-required": "external",
    "resource": process.env.KEYCLOAK_CLIENT_ID,
    "public-client": true,
    "confidential-port": 0
};
app.use(morgan('dev')); // Logging middleware for development
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: memoryStore,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000 // 10 seconds for testing purposes
    }
}));
const keycloak = new KeycloakConnect({store: memoryStore}, kcConfig);
app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('trust proxy', true);


app.get('/', (req, res) => {
    {/* This will render the landing page */}
    res.render('landing');
});
// app.get('logout', (req, res) => {
//     {/* This will log the user out from Keycloak */}
//     keycloak.logoutUrl('htttp://localhost:9002')
//     res.redirect('/')
// });

app.use('/dashboard', keycloak.protect(), dashboardRoute)


app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.APP_URL || `http://localhost:${PORT}`}`);
});
