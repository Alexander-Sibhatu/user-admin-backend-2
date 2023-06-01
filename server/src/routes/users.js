const formidable = require('express-formidable')
const router = require('express').Router();

const { registerUser, verifyEmail } = require('../controllers/users');

router.post('/register', formidable(), registerUser)
router.post('/verify-email', verifyEmail)

module.exports = router