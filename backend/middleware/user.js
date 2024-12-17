const User = require("../models/User.model");

const adminMiddleware = async (req, res, next) => {
    const userName = req.headers.username;
    const user = await User.findOne({ userName})
    if(user.isAdmin) {
        next();
    }else {
        return res.status(400).send("User is not admin")
    }
    
}

module.exports = {
    adminMiddleware
}