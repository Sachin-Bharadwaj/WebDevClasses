import { createClient } from 'redis'


const client = createClient();
async function connectRedis() {
    try{
        await client.connect()
        console.log("Connected to Redis")
    } catch (err) {
        console.error(`Failed to connect to Redis, err: ${err}`);
    }
}

async function main() {
    await connectRedis();
    while(1) {
        try{
            const response = await client.brPop("submissions", 0);
            // actually run the user code in a docker container like docker exec
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // send it to the Pub-Sub
            console.log("Processed submission", response);
        } catch(err) {
            console.error(`Redis error: ${err}`)
        }
    }
}

main()