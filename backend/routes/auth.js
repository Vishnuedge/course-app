const {Router} = require("express");
const User = require("../models/User.model");
const router  = Router();

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