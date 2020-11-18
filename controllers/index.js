const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./authController');

// Auth Routes
router.use('/auth', authRoutes);

// API Routes
router.use('/api', apiRoutes);

module.exports = router;
