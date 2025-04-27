const express = require("express");

const PORT = process.env.PORT || 3060;

const app = express();
app.use(express.json());

const users = []; // global variable to store user credentials

function generateToken() {
    return Math.random().toString(36).substr(2);
}

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
        token = generateToken();
        u.token = token;
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

app.get("/me", function (req, res) {
    const token = req.headers.token;
    const u = users.find(user => user.token == token);
    console.log("----");
    console.log(req.headers);
    console.log(token);
    console.log(users);
    console.log("^^^^^^^");
    console.log(u.username);
    if (u.token) {
        res.json({
            message: `Welcome ${u.username}`
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