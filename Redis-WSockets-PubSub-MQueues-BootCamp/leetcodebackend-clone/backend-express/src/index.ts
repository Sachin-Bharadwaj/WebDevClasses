import express from 'express'
import { createClient } from 'redis'


const app = express();
const client = createClient();

app.use(express.json())

app.post("/submit", async (req, resp) => {
    const {problemId, userId, code, language} = req.body;
    // push this to a database ideally (but not doing it here)

    try {
        // publishing to Redis Queue
        client.lPush("submissions", JSON.stringify({problemId, userId, code, language}))
        resp.json({message: "Submitted successfully"})
    } catch (err) {
        console.error(`Redis error: ${err}`);
        resp.status(500).json({message: "Failed to submit"})
    }
    

})

async function startServer() {
    try{
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3000, () => {
            console.log(`Server is running on http://localhost:3000`);
        })
    } catch (err) {
        console.error(`Failed to connect to Redis, err: ${err}`);
    }
}

startServer()
