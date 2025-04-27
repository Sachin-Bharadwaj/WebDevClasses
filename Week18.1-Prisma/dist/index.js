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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3090;
const client = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'] // specify what type of logs to capture
});
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.create({
            data: {
                username: "JC",
                password: "ddghhghhgffd",
                age: 14,
                city: "aaaaa"
            }
        });
    });
}
function deleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.delete({
            where: {
                id: 1
            }
        });
    });
}
function updateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.update({
            where: {
                id: 3
            },
            data: {
                username: "John Carter"
            }
        });
    });
}
function findUser(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Hers: ${userid}`);
        const user = yield client.user.findFirst({
            where: {
                id: userid
            },
            //select: {
            //    username: true
            //},
            include: {
                todos: true
            }
        });
        console.log(user);
        return user;
    });
}
function findAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.findMany({
            include: {
                todos: true
            }
        });
        //console.log(user);
        return user;
    });
}
//createUser();
//deleteUser();
//updateUser();
//findUSer();
// just a get route for example
app.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield findAllUser();
        resp.json({
            message: users
        });
    }
    catch (err) {
        resp.json(`Error fetching user: ${err}`);
    }
}));
// just a get route for example
app.post("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(typeof id, id);
    try {
        const user = yield findUser(id);
        resp.json({
            message: user
        });
    }
    catch (err) {
        resp.json({ message: `Error fetching user: ${err}` });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
