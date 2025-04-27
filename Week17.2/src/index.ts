import 'dotenv/config'
import { Client } from "pg"
import express from "express"
import { users_table, addresses_table } from "./db";

const PORT = process.env.PORT || 3999
const app = express();
app.use(express.json());

// create client obj
const pgClient = new Client({
    user: "neondb_owner",
    password: "F4PMiDuT7ACc",
    port: 5432,
    host: "ep-morning-sun-a1ane78y.ap-southeast-1.aws.neon.tech",
    database: "neondb",
    ssl: true
});

// make connection
async function connectDB() {
    try{
        await pgClient.connect();
        console.log("Connected to database");

        // create users tables
        await pgClient.query(users_table);

        // create addresses table
        await pgClient.query(addresses_table);
        console.log('all tables created successfully');

        
    } catch(err) {
        console.log(`Database connection error: ${err}`)
    }
}

connectDB();

// signup end point
app.post("/signup", async (req, res) => {
    // simple extraction
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;

    try{
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`;
        const addressInserQuery = `INSERT INTO addresses (user_id, city, country, street) VALUES ($1, $2, $3, $4)`;
        
        await pgClient.query("BEGIN;");
        const response = await pgClient.query(insertQuery, [username, email, password]);
        const addressResponse = await pgClient.query(addressInserQuery, [response.rows[0].id, city, country, street]);
        await pgClient.query("COMMIT;");

        res.json({
            message: "User created successfully"
        })

    } catch(err) {
        res.json('Error inserting into DB')
    }
    

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


