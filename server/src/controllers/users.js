const jwt = require('jsonwebtoken');
const fs = require('fs');

const dev = require('../config');

const { securePassword, comparePassword } = require("../helpers/bcryptPassword");
const User = require('../models/users');
const { sendEmailWithNodeMailer } = require('../helpers/email');


const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.fields;
        const {image} = req.files;

        if(!name || !email || !phone || !password) {
            return res.status(404).json({
                message: "name, email, phone or password is missing"
            })
        }

        if (password.length < 6) {
            return res.status(404).json({
                message: 'minimum length for password is 6'
            })
        }
        if (image && image.size > 10000000) {
            return res.status(404).json({
                message: 'maximum size for image is 1Mb'
            })
        }

        const isExist = await User.findOne({email: email})
        if(isExist){
            return res.status(404).json({
                message: 'user with email already exists'
            })
        }

        const hashedPassword = await securePassword(password);
        //store the data
        const token = jwt.sign(
                {name, email, phone, hashedPassword, image}, 
                dev.jwtSecretKey,
                {expiresIn: '5m'}
            );

            // prepare the email
            const emailData = {
             email,
             subject: "Account Activation Email",
             html: `
             <h2> Hello ${name} . </h2>
             <p> Please click <a href="${dev.clientUrl}/user/activate/${token}">here</a> to  activate your account </p>     
             `, // html body
           };
            
           sendEmailWithNodeMailer(emailData);

            // verification email to the user
        
            res.status(200).json({
                message: 'A verification email has been sent to your email.',
                token: token,
            });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const verifyEmail = (req, res) => {
    try {
        const {token} = req.body;
        if(!token) {
            return res.status(404).json({
                message: "token is missing"
            })
        }

        jwt.verify(token, dev.jwtSecretKey, async function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Token is expired"
            
                });
            }
            // decoded the data
            const { name, email, phone, hashedPassword, image  } = decoded;
            const isExist = await User.findOne({email: email})
        if(isExist){
            return res.status(404).json({
                message: 'user with email already exists'
            })
        }

        // create the user

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
        })

        if (image) {
            newUser.image.data = fs.readFileSync(image.path);
            newUser.image.contentType = image.type;
        }
        // save the user
        const user = await newUser.save()
        if(!user) {
            res.status(400).json({
                message: 'user was not repeated',
            });
        }
        res.status(201).json({
            user : user,
            message: 'user was created. Ready to sign in.'
        })
          });
          
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const loginUser = async (req, res) => {
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
        if(registerUser.is_banned) {
            return res.status(400).json({message: 'Banned user'})
        }

        const isPasswordMatch = await comparePassword(password, registeredUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: 'email/password does not match',
            });
        }

        res.status(200).json({
            user: registeredUser,
            message: 'login successful'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })
    }
}

const logoutUser = (req, res) => {
    try {
        res.status(200).json({
            message: 'logout successful'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })   
    }
}

const userProfile = (req, res) => {
    try {
        res.status(200).json({
            message: ''
        });
    } catch (error) {
        res.status(500).json({
            message: error.message, 
        })   
    }
}

module.exports = { registerUser, verifyEmail, loginUser, logoutUser, userProfile };