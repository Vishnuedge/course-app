const {Router} = require("express");
const User = require("../models/User.model");

const router = Router();

router.post("/addUser", (req, res) => {
    const userName  = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        userName,
        email,
        password
    });
    user.save();
    res.status(201).json({
        message : "User Created Sucessfully"
    })
})

module.exports = router;