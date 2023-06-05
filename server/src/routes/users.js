const formidable = require('express-formidable')
const router = require('express').Router();

const { 
    registerUser, 
    verifyEmail,
    loginUser,
    logoutUser,
    userProfile,
 } = require('../controllers/users');

router.post('/register', formidable(), registerUser)
router.post('/verify-email', verifyEmail)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/profile', userProfile)

module.exports = router