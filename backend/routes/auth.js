const express = require('express');
const router = express.Router();

const {
  register,
  login
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

// Public: creates only a Patient user/profile
router.post('/register', register);

// Public: login for patient, doctor, or admin
router.post('/login', login);

// Protected: returns the user represented by the JWT token
// router.get('/me', protect, getCurrentUser);
//

module.exports = router;