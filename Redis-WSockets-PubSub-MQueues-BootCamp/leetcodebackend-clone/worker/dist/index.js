"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
        }
        catch (err) {
            console.error(`Failed to connect to Redis, err: ${err}`);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectRedis();
        while (1) {
            const response = yield client.brPop("submissions", 0);
            // actually run the user code in a docker container like docker exec
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            // send it to the Pub-Sub
            console.log("Processed submission", response);
        }
    });
}
main();
