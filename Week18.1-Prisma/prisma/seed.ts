import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createDummyUsers() {
    await client.user.create({
        data: {
            username: "JC",
            password: "ddghhghhgffd",
            age: 14,
            city: "aaaaa",
            todos: {
                create: {
                    title: "go to gym",
                    description: "health",
                    done: false
                }
            }
        }
    });

    await client.user.create({
        data: {
            username: "JC",
            password: "ddghhghhgffd",
            age: 14,
            city: "aaaaa"
        }
    });

    await client.user.create({
        data: {
            username: "JC",
            password: "ddghhghhgffd",
            age: 14,
            city: "aaaaa"
        }
    });
}

createDummyUsers();