require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET; 
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const databaseUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@testcluster.f3fh7.mongodb.net/course-selling-applatest`;


async function connectDatabase(uri) {
    try {
        await mongoose.connect(uri);
        console.log(`Connected to MongoDB successfully!`)
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }

}
connectDatabase(databaseUri);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});