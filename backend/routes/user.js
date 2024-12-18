const {Router} = require("express");
const User = require("../models/User.model");
const Course = require("../models/Course.model");

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

router.get("/courses", async (req, res) => {
    try {
      const allCourses = await Course.find({});
      if (allCourses.length > 0) {
        return res.status(200).json({
          data: allCourses,
          message: "All courses retrieved successfully",
        });
      }
  
      return res.status(404).json({
        message: "No courses found",
      });
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
  

router.post("/purchaseCourse/:courseId", async (req, res) => {
    const {courseId} = req.params;
    const {userId} = req.body;
    const course = await Course.findById(courseId);
    const user = await User.updateOne({_id : userId}, {$push : { purchasedCourse : course._id }}, {new :true});
    if(user){
        return res.status(200).send("User Purchased the course sucessfully")
    }
    return res.status(400).send("User cant purchase course")
})

router.get("/getAllPurchasedCourse", async (req, res) => {
    const {userId} = req.body;
    const purchasedCourses = await User.findOne({ _id : userId }).populate('purchasedCourse').exec(['userName', 'password']);

    if(purchasedCourses) {
        return res.status(200).json({
            data : purchasedCourses,
            message : "All Purchased courses retrived successfully"
        })
    }

    return res.status(400).send("Courses not retrieved")

})

module.exports = router;