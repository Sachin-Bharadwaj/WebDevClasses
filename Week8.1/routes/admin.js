require("dotenv").config();
const express = require("express");
const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const bcrypt = require('bcrypt');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { signupInpValidator, loginInpValidator } = require("../validator");
const { adminAuthMiddleware } = require("../middleware/admin");

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;


const adminRouter = Router();

// admin signup route
adminRouter.post('/signup', async function (req, res) {
    // validate inputs using zod
    parseDataWithSuccess = signupInpValidator(req);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return;
    }

    const { email, firstname, lastname, password }  = req.body; 
    const hashedPassword = await bcrypt.hash(password, 5);

    let thrownError = false;
    try {
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname
        });

    } catch (e) {
        console.log("Error while signing up admin in database");
        res.status(403).json({
            message: "Admin already exists"
        });
        thrownError = true;
    }

    if (!thrownError) {
        res.json({
            message: "admin signup successful"
        });
    }
});

// admin login route
adminRouter.post('/login', async function (req, res) {
    // validate inputs using zod
    parseDataWithSuccess = loginInpValidator(req);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return;
    }

    const { email, password }  = req.body; 

    // check if user is registered or not
    let thrownError = false;
    let user = null;
    try{
        user = await adminModel.findOne({
            email: email
        });
    } catch (err) {
        console.log("Error while reading database, Admin login route");
        res.status(403).json({
            message: "Error while reading database, Admin login route"
        })
        thrownError = true;
    }

    if (!thrownError) {
        if(!user) {
            res.status(403).json({
                message: "Admin user not registered"
            });
            return;
        }
        // compare the hashed password
        const passwordMatched = bcrypt.compare(password, user.password);

        if(!passwordMatched) {
            res.status(403).json({
                message: "Admin Password does not match"
            });
        } else {
            const token = jwt.sign({id: user._id}, JWT_ADMIN_SECRET);
            res.json({
                token: token,
                message: "Admin logged in successfully"
            });
        }

    }
});

// admin create course
adminRouter.post('/course', adminAuthMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;

    let thrownError = false;
    let course = null;
    try {
        course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: adminId
        });

    } catch (err) {
        console.log("error while admin adding new course to database");
        res.json({
            message: "error while admin adding new course to database",
            error: err
        });
        thrownError = true;
    }
    if (!thrownError) {
        res.json({
            message: "admin create new course in db",
            courseId: course._id
        });
    }
});

// admin change prop of course like price etc
adminRouter.put('/course', adminAuthMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl, courseId } = req.body;

    // check whether courseId belongs to adminId( whether adminId is the creator of this course aka courseId)
    // we do this in dminModel.updateOne({filter},{payload})

    let thrownError = false;
    let course = null;
    try{
        course = await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        },{
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: adminId
        })
    } catch (err) {
        console.log("Course update failed by the admin")
        thrownError = true;
        res.json({
            message: "Course update failed by the admin"
        })
    }
    if(!thrownError) {
        res.json({
            message: "Course updated by the admin"
        });
    }
    
});

// get all the course that admin has created in bulk
adminRouter.get('/course/bulk', adminAuthMiddleware, async function (req, res) {
    const adminId = req.userId;

    let thrownError = false;
    let courses = null;
    try{
        courses = await courseModel.find({
            creatorId: adminId
        })
    } catch (err) {
        console.log("fetching all course failed for the admin from db");
        thrownError = true;
        res.json({
            message: "fetching all course failed for the admin from db"
        });
    }
    if(!thrownError) {
        res.json({
            courses
        });
    }
    
});

module.exports = {
    adminRouter: adminRouter
}

