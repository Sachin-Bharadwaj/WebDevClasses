import express from "express";

const app = express();

app.get("/signup", (req, res) => {
    res.send("hello world");

})

app.get("/signin", (req, res) => {
    res.send("hello world");
    
})

app.get("/signup", (req, res) => {
    res.send("hello world");
    
})

const PORT = 4999;
app.listen(PORT, () => {
    console.log(`server started at PORT: ${PORT}`)
})