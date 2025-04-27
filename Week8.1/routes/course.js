require("dotenv").config();
const express = require('express');
const { Router } = require('express');
const { purchaseModel, courseModel } = require('../db');
const bcrypt = require('bcrypt');
const { z } = require("zod");
const { userAuthMiddleware } = require("../middleware/user");

const courseRouter = Router();

// view all course route, this need not be authenticated
courseRouter.get('/preview', async function (req, res) {
    let thrownError = false;
    let courses = null;
    try{
        courses = await courseModel.find({});

    } catch (err) {
        console.log("No course found");
        thrownError = true;
        res.json({
            message: "No courses found"
        });
    }

    if(!thrownError){
        res.json({
            courses
        });
    }
    
});

// user purchase course
courseRouter.post('/purchases', userAuthMiddleware, async function (req, res) {
    // in realworld, you would have to integrate Razorpay but here we will not

    const userId = req.userId;
    const courseId = req.body.courseId;

    // Todo: put a check whether user has already bought this course or not

    let thrownError = false;
    try{
        await purchaseModel.create({
            userId: userId,
            courseId: courseId
        });

    } catch (err) {
        console.log("User pruchase failed");
        res.json({
            message: "User purchase failed"
        });
        thrownError = true;
    }

    if(!thrownError){
        res.json({
            message: "User purchase successful"
        });
    };
    
});

module.exports = {
    courseRouter: courseRouter
}