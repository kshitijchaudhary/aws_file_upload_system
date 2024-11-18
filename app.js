require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const authenticate = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
});
app.use(limiter);

// Routes
app.use('/auth', authRoutes);
app.use('/upload', authenticate, uploadRoutes);

app.get('/',  authenticate,  (req, res) => {
    res.render('upload', { 
        user: req.session.user,
        studentName: "Kshitij Chaudhary",
        studentNumber: "C0920457"
    });
});

app.get('/upload', authenticate, (req, res) => {
    res.render('upload');
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});