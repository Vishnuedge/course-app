const express = require("express");
require('dotenv').config();
const { dbConnect } = require("./db/db");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const {authMiddleware} = require("./middleware/auth")

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/admin", authMiddleware, adminRouter);
app.use("/user",authMiddleware, userRouter);

const PORT = process.env.PORT || 8001

try {
    dbConnect();
    console.log("Connected to Database Sucessfully!");
} catch (error) {
    console.log(error)
}
app.listen(PORT, () => {
    console.log(`App is listening to the port ${PORT}`)
})