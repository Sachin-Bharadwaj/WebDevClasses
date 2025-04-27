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
require("dotenv/config");
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const PORT = process.env.PORT || 3999;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// create client obj
const pgClient = new pg_1.Client({
    user: "neondb_owner",
    password: "F4PMiDuT7ACc",
    port: 5432,
    host: "ep-morning-sun-a1ane78y.ap-southeast-1.aws.neon.tech",
    database: "neondb",
    ssl: true
});
// make connection
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pgClient.connect();
            console.log("Connected to database");
            // create users tables
            yield pgClient.query(db_1.users_table);
            // create addresses table
            yield pgClient.query(db_1.addresses_table);
            console.log('all tables created successfully');
        }
        catch (err) {
            console.log(`Database connection error: ${err}`);
        }
    });
}
connectDB();
// signup end point
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // simple extraction
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    try {
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`;
        const addressInserQuery = `INSERT INTO addresses (user_id, city, country, street) VALUES ($1, $2, $3, $4)`;
        yield pgClient.query("BEGIN");
        const response = yield pgClient.query(insertQuery, [username, email, password]);
        const addressResponse = yield pgClient.query(addressInserQuery, [response.rows[0].id, city, country, street]);
        yield pgClient.query("COMMIT");
        res.json({
            message: "User created successfully"
        });
    }
    catch (err) {
        res.json('Error inserting into DB');
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
