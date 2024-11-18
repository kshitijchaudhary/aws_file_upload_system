// Import and configure dotenv (for environment variables)
require('dotenv').config();

const express = require('express');
const router = express.Router();

// Access environment variables with new names
const USERNAME = process.env.AUTH_USERNAME;
const PIN = process.env.AUTH_PIN;

// Login Page
router.get('/login', (req, res) => {
    const error = req.session.error || null;
    res.render('login', { error: error });
});

// Handle Login
router.post('/login', (req, res) => {
    const { username, pin } = req.body;

    // Debug logs to check values
    console.log('Received username:', username);
    console.log('Received pin:', pin);
    console.log('Environment AUTH_USERNAME:', USERNAME);
    console.log('Environment AUTH_PIN:', PIN);

    // Check credentials
    if (username === USERNAME && pin === PIN) {
        req.session.username = username;
        req.session.pin = pin;
        return res.redirect('/upload');
    }

    // Invalid credentials
    req.session.error = 'Invalid username or PIN';
    res.redirect('/auth/login');
});

//Handle Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/auth/login');
    });
});
// Log environment variables for debugging
console.log('Loaded AUTH_USERNAME:', USERNAME);
console.log('Loaded AUTH_PIN:', PIN);

module.exports = router;
