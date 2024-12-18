const {Router} = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const router  = Router();


router.post("/signin",async (req, res) => {
    const {userName, password, isAdmin} = req.body;

        const user = await User.find({
            userName,
            password
        });
    if(user.length) {
        const token = jwt.sign({userName  :user[0].userName ,isAdmin : user[0].isAdmin}, process.env.JWT_SECRET)
        if(token){
            return res.status(200).json({
                token : `Bearer ${token}`
            })
        }
    } else {
        return res.status(400).send("Invalid User")
    }
})

router.post("/signup", (req, res) => {
    const { userName=  "", password = "", isAdmin = false} = req.body;
    const user = new User({
        userName,
        password,
        isAdmin
    });

    if(user){
        user.save();
        return res.status(201).send("User Signed Up Sucessfully")
    }

    return res.status(400).send("User Not Signed")
})

module.exports = router;