"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const validator_1 = require("./validator");
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const PORT = process.env.PORT;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const databaseUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@testcluster.f3fh7.mongodb.net/Brainly`;
function connectDatabase(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri);
            console.log(`Connected to MongoDB successfully!`);
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
        }
    });
}
connectDatabase(databaseUri);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const saltRounds = 10;
app.post("/api/v1/signup", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    // zod validation
    const parseDataWithSuccess = (0, validator_1.signupInpValidator)(req);
    if (!parseDataWithSuccess.success) {
        resp.status(400).json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        });
        return;
    }
    const { username, plainpassword } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(plainpassword, saltRounds);
    // add to database
    try {
        yield db_1.userModel.create({
            username: username,
            password: hashedPassword
        });
        resp.status(200).json({ message: "User created" });
    }
    catch (err) {
        console.log(`Error while singing up: ${err}`);
        resp.status(409).json({ message: "User already exists" });
    }
}));
app.post("/api/v1/signin", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    // Zod validation
    const parseDataWithSuccess = (0, validator_1.signupInpValidator)(req);
    if (!parseDataWithSuccess.success) {
        resp.status(400).json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        });
        return;
    }
    const { username, plainpassword } = req.body;
    // check if user exist or not
    const user = yield db_1.userModel.findOne({ username: username });
    if (!user) {
        resp.status(400).json({
            message: "User does not exist"
        });
        return;
    }
    // if user exist, check password
    const isPasswordValid = yield bcrypt_1.default.compare(plainpassword, user.password);
    if (!isPasswordValid) {
        resp.status(403).json({
            message: "Password is incorrect"
        });
        return;
    }
    else {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_USER_SECRET);
        resp.json({
            token: token
        });
    }
}));
// authenticated endpoint
app.post("/api/v1/content", middleware_1.userMiddleware, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type, userid } = req.body;
    try {
        yield db_1.contentModel.create({
            title: title,
            link: link,
            type: type,
            userid: userid
        });
        resp.json({
            message: "Content created"
        });
    }
    catch (err) {
        resp.status(400).json({
            message: "Error creating content",
            error: err
        });
    }
}));
// authenticated endpoint
app.get("/api/v1/content", middleware_1.userMiddleware, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.body.userid;
    try {
        const content = yield db_1.contentModel.find({ userid: userid })
            .populate("userid", "username");
        resp.json({
            content
        });
    }
    catch (err) {
        resp.status(500).json({
            message: "Error fetching content",
            error: err
        });
    }
}));
// authenticated endpoint
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.body.userid;
    const contentid = req.body.contentid;
    try {
        yield db_1.contentModel.deleteMany({ userid: userid, _id: contentid });
        resp.json({
            message: "Content deleted"
        });
    }
    catch (err) {
        resp.status(500).json({
            message: "Error deleting content",
            error: err
        });
    }
}));
// authenticated endpoint
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { share, userid } = req.body;
    let found = false;
    if (share) {
        const hash = (0, utils_1.random)(10);
        // check if the link is already generated for the user then return
        const existingLink = yield db_1.linksModel.findOne({
            userid: userid
        });
        if (existingLink) {
            resp.json({
                message: "Link already generated",
                hash: existingLink.hash
            });
            return;
        }
        try {
            yield db_1.linksModel.create({
                userid: userid,
                hash: hash
            });
            resp.json({
                message: "Link created",
                hash: hash
            });
        }
        catch (err) {
            resp.status(500).json({
                message: "Error creating link",
                error: err
            });
            return;
        }
    }
    else {
        try {
            const result = yield db_1.linksModel.deleteOne({
                userid: userid
            });
            //console.log(result);
            found = true;
        }
        catch (err) {
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
        });
    }
    else {
        resp.json({
            message: "Link could not be found"
        });
    }
}));
// un-authenticated endpoint
app.get("/api/v1/brain/:shareLink", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.linksModel.findOne({
        hash: hash
    });
    if (!link) {
        resp.status(404).json({
            message: "Link not found"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userid: link.userid
    });
    const user = yield db_1.userModel.findOne({
        _id: link.userid
    });
    resp.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
