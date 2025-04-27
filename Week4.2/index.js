const express = require('express');

const app = express();
const PORT = 3050;


// route handlers
app.get('/', function (req, res) {
    res.send('Hello world!');
})

app.listen(PORT);