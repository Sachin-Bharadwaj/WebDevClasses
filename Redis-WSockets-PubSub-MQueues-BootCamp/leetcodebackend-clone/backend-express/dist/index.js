"use strict";
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
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)();
app.use(express_1.default.json());
app.post("/submit", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemId, userId, code, language } = req.body;
    // push this to a database ideally (but not doing it here)
    try {
        // publishing to Redis Queue
        client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }));
        resp.json({ message: "Submitted successfully" });
    }
    catch (err) {
        console.error(`Redis error: ${err}`);
        resp.status(500).json({ message: "Failed to submit" });
    }
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
            app.listen(3000, () => {
                console.log(`Server is running on http://localhost:3000`);
            });
        }
        catch (err) {
            console.error(`Failed to connect to Redis, err: ${err}`);
        }
    });
}
startServer();
