const {Router} = require("express");
const User = require("../models/User.model");
const { hashPassword } = require("../utlis");
const Course = require("../models/Course.model");
const { adminMiddleware } = require("../middleware/user");
const router = Router();

router.post("/signup", (req, res) => {
    let userName = req.body.username;
    let password = req.body.password;
    let isAdmin = true;

    const user = new User({
        userName,
        password,
        isAdmin
    })
    if(user){
        user.save();
        return res.status(201).send("User Created Sucessfully");
    }

    return res.status(400).send("User not created");
})

router.post("/addCourse", adminMiddleware, (req, res) => {
    const {courseTitle="", courseDescription="", coursePrice = 0, courseBanner } = req.body; 
    const course =  new Course({
        title : courseTitle,
        description : courseDescription,
        imageLink : courseBanner,
        price  : coursePrice,
    });
    console.log(course)
    if(course) {
        course.save();
        return res.status(201).send("Course Created Sucessfully.");
    }

    return res.status(400).send("Course not created");
})

module.exports = router