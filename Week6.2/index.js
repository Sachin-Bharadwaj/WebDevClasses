const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const JWT_SECRET = "AbbaDabbaChabba";

const PORT = process.env.PORT || 3060;

const app = express();
app.use(express.json());
app.use(cors());

const users = []; // global variable to store user credentials


app.post("/signup", function (req, res) {
    const { username, password } = req.body;
    // check if username already exists
    if (users.find(user => user.username === username)) {
        res.status(400).json({ message: "Username already exists!" });
    }
    
    users.push({ username: username, password: password });
    res.json({ message: "You are signed up!" });
    console.log(users);
});

app.post("/signin", function (req, res) {
    const { username, password } = req.body;
    // check if username exists
    let u = users.find(user => user.username === username && user.password === password);
    if (u) {
        token = jwt.sign({ username: u.username }, JWT_SECRET);
        res.json({
            message: token
        })
        
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users);

});

// auth middleware for rest /me endpoint
function auth(req, res, next) {
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_SECRET); // you can also use jwt.decode(token) where you do not need JWT_SECRET
    
    if (decodedInformation.username) {
        req.username = decodedInformation.username;
        next();
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

app.get("/me", auth, function (req, res) {

    const u = users.find(user => user.username === req.username);
    if (u) {
        res.json({
            message: `Welcome ${u.username}`,
            password: u.password
        })
    } else {
        res.status(403).send({
            message: "Invalid token"
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server sucessfully started on http://localhost:${PORT}`);
});