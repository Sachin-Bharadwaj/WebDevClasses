"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
// returns a random string of length len
function random(len) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
