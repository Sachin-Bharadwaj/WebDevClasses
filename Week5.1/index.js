const express = require('express');

const PORT = process.env.port || 3010;
const app = express();

// commonly used Middleware
// express.json : parse incoming req body formatted as json

let req_counter = 0;
function reqInc(req, resp, next) {
    req_counter = req_counter + 1;
    console.log(`Current req counter: ${req_counter}`);
    next();
}

// specify endpoint
app.get("/sum", reqInc, function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    res.json({answer: a + b});
});

// dynamic request instead of query params
app.get("/sum/:a/:b", function(req, res) {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    res.json({answer: a + b});
});
// post req
app.use(express.json()); // or use const bodyParser = require("body-parser"), app.use(bodyParser.json())
app.post("/sum", function(req, res) {
    const a = parseFloat(req.body.a);
    const b = parseFloat(req.body.b);
    res.json({answer: a + b});
});

app.get("/sub", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    res.json({answer: a - b});
});

// dynamic request instead of query params
app.get("/sub/:a/:b", function(req, res) {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    res.json({answer: a - b});
});

app.get("/mult", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    res.json({answer: a * b});
});
// dynamic request instead of query params
app.get("/mult/:a/:b", function(req, res) {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    res.json({answer: a * b});
});

app.get("/div", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    res.json({answer: a / b});
});
// dynamic request instead of query params
app.get("/div/:a/:b", function(req, res) {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    res.json({answer: a / b});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});