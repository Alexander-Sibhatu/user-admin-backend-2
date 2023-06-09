const formidable = require('express-formidable')
const session = require('express-session')
const userRouter = require('express').Router();
const dev = require('../config/index')

const { 
    registerUser, 
    verifyEmail,
    loginUser,
    logoutUser,
    userProfile,
    deleteUser,
    updateUser,
    forgetPassword,
    resetPassword,
 } = require('../controllers/users');
const {isLoggedIn, isLoggedOut} = require('../middlewares/auth');
const upload = require('../middlewares/upload');

 userRouter.use(
    session({
    name: 'user_session',
    secret: dev.sessionKey || DHFADFghfghfdSD_235235,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 10 * 6000 },
  }))

userRouter.post('/register', upload.single('image'), registerUser)
userRouter.post('/verify-email', verifyEmail)
userRouter.post('/login', isLoggedOut, loginUser)
userRouter.get('/logout', isLoggedIn, logoutUser)
userRouter.get('/', isLoggedIn, userProfile)
userRouter.delete('/', isLoggedIn, deleteUser)
userRouter.put('/', isLoggedIn, formidable(), updateUser);
userRouter.post('/forget-password', isLoggedOut, forgetPassword);
userRouter.post('/reset-password', isLoggedOut, resetPassword);

module.exports = userRouter