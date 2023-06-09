const formidable = require('express-formidable')
const session = require('express-session')
const adminRouter = require('express').Router();


const dev = require('../config/index')


const { logoutAdmin, loginAdmin, getAllUsers } = require('../controllers/admin');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');

 adminRouter.use(
    session({
    name: 'admin_session',
    secret: dev.sessionKey || DHFADFghfghfdSD_235235,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 10 * 6000 },
  }))

adminRouter.post('/login', isLoggedOut, loginAdmin)
adminRouter.get('/logout', isLoggedIn, logoutAdmin)
adminRouter.get('/dashboard', isLoggedIn, getAllUsers)
// adminRouter.get('/dashboard', isLoggedIn, createUser)
// adminRouter.get('/dashboard', isLoggedIn, deleteUser)
// adminRouter.get('/dashboard', isLoggedIn, updateUser)

module.exports = adminRouter