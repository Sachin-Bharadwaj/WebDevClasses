const fs = require('fs');
// teaches Class, promise

if (0) {
    function setTimeoutPromise(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function callback(){
        console.log(" 3 sec have passed");
    }

    setTimeoutPromise(3000).then(callback)
}

// Promisify the reading of file
if (0) {
    function readTheFile(resolve) {
        fs.readFile('a.txt', 'utf-8', function (err, data){
            resolve(data);
        })
    }
    // function to return the promise object
    function readfile(filename) {
        return new Promise(readTheFile)
    }
    // callback function called when promised is honoured
    function callback(contents) {
        console.log("Done reading the file\n")
        console.log(`contents: ${contents}`)
    }

    readfile("a.txt").then(callback)
}

// own primitive version of Promise class
class Promise_ours {
    thenCbs = []
    constructor(fn) {
        fn(this.onSuccess)
    }
    
    onSuccess() {
        this.thenCbs.forEach(callback => {callback()});
    }

    #onFail() {

    }

    then(callback) {
        //console.log("callback registered in class")
        this.thenCbs.push(callback);
        //console.log(`this.resolve after after registering: ${this.resolve}`)
        //this.resolve();
    }
    
}


let p = new Promise_ours(function asyncOp(resolve){
    setTimeout(resolve, 3000);
})

function callback() {
    console.log("call back called!");
} 
p.then(callback);