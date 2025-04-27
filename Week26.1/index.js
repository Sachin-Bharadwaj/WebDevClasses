const express = require('express');

const app = express();

app.get('/', (req, resp) => {
    resp.send("Hello World")
})

console.log(`ENV variable: ${process.env.DATABASE_URL}`)
app.listen(3000)
