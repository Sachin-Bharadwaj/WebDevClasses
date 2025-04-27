require("dotenv").config();
const express = require('express');
const { Router } = require('express');
const { userModel } = require('../db');
const bcrypt = require('bcrypt');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { signupInpValidator, loginInpValidator } = require("../validator");
const { userAuthMiddleware } = require("../middleware/user");

const userRouter = Router();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;


// user signup route
userRouter.post('/signup', async function (req, res) {
    parseDataWithSuccess = signupInpValidator(req);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return
    }

    const { email, firstname, lastname, password }  = req.body; 
    const hashedPassword = await bcrypt.hash(password, 5);

    let thrownError = false;
    try{
        await userModel.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword
        });
    } catch (err) {
        console.log("Error while signingup user in database");
        res.status(403).json({
            message: "User already exists"
        })
        thrownError = true;
    }

    if (!thrownError) {
        res.json({
            message: "user signup route"
        });
    }
});

// user login route
userRouter.post('/login', async function (req, res) {
    parseDataWithSuccess = loginInpValidator(req);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return;
    }

    const { email, password }  = req.body; 

    let thrownError = false;
    let user = null;
    try {
        // check if user is registered or not
        user = await userModel.findOne({
            email: email
        });
    } catch (err) {
        thrownError = true;
        res.json({
            message: "Error while reading database, user login route",
            error: err
        });
    }
    
    if (!thrownError) {
        // if user does not exists
        if (!user) {
            res.status(403).json({
                message: "User does not exists in our db"
            });
            return;
        }
        
        // compare the password
        const passwordMatched = await bcrypt.compare(password, user.password);

        // if password does not match
        if (!passwordMatched){
            res.status(403).json({
                message: "Invalid password"
            });
        } else {
            token = jwt.sign({id: user._id}, JWT_USER_SECRET);
            res.json({
                token: token,
                message: "User logged in successfully"
            });
        }
    }

});


// view all pruchased courses, this is authenticated route
userRouter.get('/purchases', userAuthMiddleware, async function (req, res) {
    const userId = req.userId;

    let thrownError = false;
    let courses = null;
    let coursesDetails = null;
    try {
        courses = await purchaseModel.find({
            userId: userId
        }); // this only returns the course ids

        coursesDetails = await courseModel.find({
            _id: {
                $in: courses.map(x => x.courseId)
            }
        });

    } catch (err) {
        console.log("Error while fetching all the purchased courses");
        res.json({
            message: "Error while fetching all the purchased courses",
            error: err
        });
        thrownError = true;
    }

    if (!thrownError) {
        res.json({
            courses,
            coursesDetails
        })
    }
    
});

module.exports = {
    userRouter: userRouter
}
