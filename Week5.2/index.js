const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3060;

const app = express();
//app.use(cors(
//    {
//        domains: ["https://google.com", "https://employee.google.com"]
//    }
//));
// allow all frontend to send request to backend which are hosted on different domain
app.use(cors());

app.use(express.json());

app.post("/sum", function (req, res) {
    const a = parseFloat(req.body.a);
    const b = parseFloat(req.body.b);
    res.json({ 
        a: a,
        b: b,
        answer: a + b });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});