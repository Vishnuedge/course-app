const mongoose = require("mongoose");
const { boolean } = require("zod");

const userSchema = new mongoose.Schema({
    password : String,
    userName : String,
    isAdmin : Boolean,
    purchasedCourse : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User 