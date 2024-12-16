const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || ""

const dbConnect = async () => {
    await mongoose.connect(MONGO_URI);
}

module.exports = {
    dbConnect
}