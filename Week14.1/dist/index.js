"use strict";
let x = prompt("Enter your name: ", "");
console.log(`Hello ${x}`);
function greet(firstname) {
    console.log(`Hello ${firstname}`);
}
greet("John");
function sum(a, b) {
    return a + b;
}
console.log(sum(10, 1));
function delayedCall(fn, delay) {
    setTimeout(fn, delay);
}
delayedCall(function (message = "Hello") { console.log(message); }, 1000);
