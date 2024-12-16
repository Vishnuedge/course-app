const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    userName : String,
    purchasedCourse : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User 