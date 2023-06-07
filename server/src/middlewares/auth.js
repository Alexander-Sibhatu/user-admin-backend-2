const isLoggedIn = (req, res, next) => {
    try {
        if(req.session.userId) {
            next()
        } else {
            return res.status(400).json({ message: 'Please login!'});
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = isLoggedIn