require('dotenv').config();

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 3001,
        jwtSecretKey: process.env.JWT_SECRET_KEY || "hdfgher83335623232@2233",
        smptUsername: process.env.SMTP_USERNAME,
        smptPassword: process.env.SMTP_USERPASSWORD,
        clientUrl: process.env.CLIENT_URL,
    },
    db: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/user-admin-db',
    },
}

module.exports = dev;