const jwt = require('jsonwebtoken');
const fs = require('fs');

const dev = require('../config');

const { securePassword, comparePassword } = require("../helpers/bcryptPassword");
const User = require('../models/users');
const { sendEmailWithNodeMailer } = require('../helpers/email');




const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                message: 'email or password is missing',
            });
        }

        const registeredUser = await User.findOne({email});
        if(!registeredUser){
            return res.status(400).json({
                message: 'Please sign up first!',
            });
        }
        if(registeredUser.is_banned) {
            return res.status(400).json({message: 'Banned user'})
        }

        // isAdmin
        if(registeredUser.is_admin === 0) {
            return res.status(400).json({
                message: 'Not an admin'
            })
        }
        const isPasswordMatch = await comparePassword(password, registeredUser.password);
        
        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'email/password does not match',
            });
        }

        // creating session >> browser as a cookie
        req.session.userId = registeredUser._id;
        
        
        res.status(200).json({
            user: {
                name: registeredUser.name,
                email: registeredUser.email,
                phone: registeredUser.phone,
                image: registeredUser.image,
            },
            message: 'login successful'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })
    }
}
// Add  
    // admin profile
    // reset password
    // forget password
    //dashboard - CRUD- create user, read all users except admin,
    
const logoutAdmin = (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('admin_session');
        res.status(200).json({
            ok: true,
            message: 'admin logout successful'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message, 
        })   
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({is_admin: 0})
        res.status(200).json({
            ok: true,
            message: 'return all users',
            users: users,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message, 
        })   
    }
}



module.exports = { 
    loginAdmin, 
    logoutAdmin, 
    getAllUsers
};