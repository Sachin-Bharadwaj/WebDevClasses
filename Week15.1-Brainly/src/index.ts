import * as dotenv from "dotenv";  
dotenv.config();
import express from "express";
import mongoose  from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel, contentModel, linksModel } from "./db";
import { signupInpValidator } from "./validator";
import cors from "cors";
import { Request, Response } from 'express';
import { userMiddleware } from "./middleware";
import { random } from "./utils";

const PORT = process.env.PORT;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET; 
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const databaseUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@testcluster.f3fh7.mongodb.net/Brainly`;


async function connectDatabase(uri: string) {
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

const saltRounds = 10

app.post("/api/v1/signup", async (req: Request, resp: Response) => {
    // zod validation
    const parseDataWithSuccess = signupInpValidator(req);
    if (!parseDataWithSuccess.success) {
        resp.status(400).json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return;
    }

    const { username, plainpassword } = req.body;
    const hashedPassword = await bcrypt.hash(plainpassword, saltRounds);
    
    // add to database
    try{
        await userModel.create({
            username: username,
            password: hashedPassword
        });
        resp.status(200).json({message: "User created"});

    } catch (err) {
        console.log(`Error while singing up: ${err}`);
        resp.status(409).json({message: "User already exists"});
    }


})

app.post("/api/v1/signin", async (req: Request, resp: Response) => {
    // Zod validation
    const parseDataWithSuccess = signupInpValidator(req);
    if (!parseDataWithSuccess.success) {
        resp.status(400).json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return;
    }

    const { username, plainpassword } = req.body;

    // check if user exist or not
    const user = await userModel.findOne({username: username});
    if(! user){
        resp.status(400).json({
            message: "User does not exist"
        })
        return 
    }

    // if user exist, check password
    const isPasswordValid = await bcrypt.compare(plainpassword, user.password);

    if(! isPasswordValid){
        resp.status(403).json({
            message: "Password is incorrect"
        })
        return 
    } else {
        const token = jwt.sign({id: user._id}, JWT_USER_SECRET!);
        resp.json({
            token: token
        });
    }

    
})

// authenticated endpoint
app.post("/api/v1/content", userMiddleware, async (req: Request, resp: Response) => {
    const { title, link, type, userid } = req.body;

    try{
        await contentModel.create({
            title: title,
            link: link,
            type: type,
            userid: userid
        });
        resp.json({
            message: "Content created"
        })
    } catch (err) {
        resp.status(400).json({
            message: "Error creating content",
            error: err
        });
    }
    
})

// authenticated endpoint
app.get("/api/v1/content", userMiddleware, async(req, resp) => {
    const userid = req.body.userid;

    try{
        const content = await contentModel.find({userid: userid})
        .populate("userid", "username");

        resp.json({
            content
        });

    } catch (err) {
        resp.status(500).json({
            message: "Error fetching content",
            error: err
        });
    }
})

// authenticated endpoint
app.delete("/api/v1/content", userMiddleware, async (req, resp) => {
    const userid = req.body.userid;
    const contentid = req.body.contentid;

    try{
        await contentModel.deleteMany({userid: userid, _id: contentid});
        resp.json({
            message: "Content deleted"
        });

    } catch (err) {
        resp.status(500).json({
            message: "Error deleting content",
            error: err
        });
    }
    
})

// authenticated endpoint
app.post("/api/v1/brain/share", userMiddleware, async(req, resp) => {
    const { share, userid } = req.body;
    let found = false;
    if (share) {
        const hash = random(10);

        // check if the link is already generated for the user then return
        const existingLink = await linksModel.findOne({
            userid: userid
        });
        if(existingLink) {
            resp.json({
                message: "Link already generated",
                hash: existingLink.hash
            });
            return;
        }

        try{
            await linksModel.create({
                userid: userid,
                hash: hash
            });
            resp.json({
                message: "Link created",
                hash: hash
            })
        } catch (err) {
            resp.status(500).json({
                message: "Error creating link",
                error: err
            });
            return;
        }
    } else {
        try{
            const result = await linksModel.deleteOne({
                userid: userid
            });
            //console.log(result);
            found = true;
        } catch (err) {
            resp.status(500).json({
                message: "Error deleting link",
                error: err
            });
            return;
        }
    }

    if (found) {
        resp.json({
            message: "Link deleted"
        })
    } else {
        resp.json({
            message: "Link could not be found"
        })
    }
})

// un-authenticated endpoint
app.get("/api/v1/brain/:shareLink", async(req, resp) => {
    const hash = req.params.shareLink;

    const link = await linksModel.findOne({
        hash: hash
    });

    if(!link){
        resp.status(404).json({
            message: "Link not found"
        });
        return;
    }

    const content = await contentModel.find({
        userid: link.userid
    });

    const user = await userModel.findOne({
        _id: link.userid
    });

    resp.json({
        username: user?.username,
        content: content
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});