// Authentication Middleware
const authenticate = (req, res, next) => {
    const { username, pin } = req.session;
    if (!username || !pin) {
        return res.redirect('/auth/login');
    }
    next();
};

module.exports = authenticate;


