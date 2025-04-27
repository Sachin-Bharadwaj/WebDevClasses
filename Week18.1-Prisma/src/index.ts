import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import express from  "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3090;

const client = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'] // specify what type of logs to capture
});

async function createUser()  {
    await client.user.create({
        data: {
            username: "JC",
            password: "ddghhghhgffd",
            age: 14,
            city: "aaaaa"
        }
        
    });

}

async function deleteUser()  {
    await client.user.delete({
        where: {
            id: 1
        }
    });
}

async function updateUser()  {
    await client.user.update({
        where: {
            id: 3
        },
        data : {
            username: "John Carter"
        }
    });
}

async function findUser(userid: number)  {
    console.log(`Hers: ${userid}`)
    const user = await client.user.findFirst({
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
}

async function findAllUser()  {
    const user = await client.user.findMany({
        include: {
            todos: true
        }
    });
    //console.log(user);
    return user;
}


//createUser();
//deleteUser();
//updateUser();
//findUSer();


// just a get route for example
app.get("/",  async (req, resp) => {
    try { 
        const users = await findAllUser();
        resp.json({
            message: users
        })

    } catch(err) {
        resp.json(`Error fetching user: ${err}`)
    }
})


// just a get route for example
app.post("/:id",  async (req, resp) => {
    const id = parseInt(req.params.id);

    console.log(typeof id, id);
    try { 
        const user = await findUser(id);
        resp.json({
            message: user
        })

    } catch(err) {
        resp.json({message: `Error fetching user: ${err}`})
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})