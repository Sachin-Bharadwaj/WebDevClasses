import { Client } from 'pg';

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
async function main() {
    await pgClient.connect();
    const response = await pgClient.query("SELECT * FROM users");
    console.log(response.rows);
}

main();


