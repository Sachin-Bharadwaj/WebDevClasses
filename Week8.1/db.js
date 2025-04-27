const mongoose = require("mongoose");
const course = require("./routes/course");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

// define User Table Schema
const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
});

// define Admin table Schema
const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
});

// define Course Table Schema
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    creatorId: ObjectId,
    imageUrl: String
});

// define Purchase Table Schema
const purchaseSchema = new Schema({
    courseId: ObjectId,
    adminId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
};