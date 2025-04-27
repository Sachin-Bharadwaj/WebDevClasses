const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8") // this is synch call
console.log(contents)

fs.readFile("a.txt", "utf-8", function (err, contents) {
    console.log(contents)
})
fs.readFile("b.txt", "utf-8", function (err, contents) {
    console.log(contents)
})
fs.readFile("a.txt", "utf-8", function (err, contents) {
    console.log(contents)
})