const {Router} = require("express");
const User = require("../models/User.model");
const { hashPassword } = require("../utlis");
const router = Router();

router.post("/signup",async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const hashedPassword = hashPassword(password);
    console.log(hashedPassword)
})

router.post("/course/:courseId", (req, res) => {

})

module.exports = router