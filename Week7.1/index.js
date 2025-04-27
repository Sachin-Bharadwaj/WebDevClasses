require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./db");
const { mongoose } = require("mongoose");
const { z } = require("zod");

const JWT_SECRET = process.env.JWT_SECRET; 
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const databaseUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@testcluster.f3fh7.mongodb.net/todo-sachin-2`;


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
const PORT = process.env.PORT || 3060;
app.use(cors());
app.use(express.json());

// this will be used for input validation in /signup endpoint
const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z
    .string()
    .min(3) // You can keep these length checks as needed
    .max(30)
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[@$!%*?&]/.test(password), {
      message: "Password must contain at least one special character",
    }),
});

// this will be used for input validation in /signin endpoint
const requireBodyPartial = requireBody.partial();

function signupInpValidator(req) {
    //const parsedData = requireBody.parse(req.body); // it throws error if not parsed
    const parseDataWithSuccess = requireBody.safeParse(req.body); // it put error in object and doesn't throw error
    return parseDataWithSuccess;
}

function signinInpValidator(req) {
    //const parsedData = requireBody.parse(req.body); // it throws error if not parsed
    const parseDataWithSuccess = requireBodyPartial.safeParse(req.body); // it put error in object and doesn't throw error
    return parseDataWithSuccess;
}

app.post('/signup', async function (req, res) {
    parseDataWithSuccess = signupInpValidator(req);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
   
    let errorThrown = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        // async call
        await UserModel.create({
            email: email,
            name: name,
            password: hashedPassword
        });
    } catch(e) {
        console.log("Error while putting things in database");
        res.json({
            message: "User already exists"
        })
        errorThrown = true;
    }

    if (!errorThrown) {
        res.json({
            message: "You are signed up!"
        })
    }
    
});

app.post('/signin', async function (req, res) {
    const parseDataWithSuccess = signinInpValidator(req);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;

    // check if user is registered or not
    const user = await UserModel.findOne({
            email: email
    });

    // if user does not exists, return
    if (!user) {
        res.status(403).json({
            message: "User does not exists in our db"
        })
        return
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
        token = jwt.sign({id: user._id}, JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Invalid username or password"
        })
    }

});

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_SECRET);
    if (decodedInformation.id) {
        req.userId = decodedInformation.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}

// Both of the below end point will be authenticated
app.post('/todo', auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = false;
    
    await TodoModel.create({
        title: title,
        done: done,
        userId: userId
    });

    res.json({
        userId: userId,
        message: "Todo created"
    });

});

app.get('/todos', auth, async function (req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId: userId
    });

    res.json({
        todos: todos
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

