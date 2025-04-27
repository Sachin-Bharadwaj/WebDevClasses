const promptSync = require("prompt-sync")();

let x: string = promptSync("Enter your name: ", "")!;
console.log(`Hello ${x}`);

function greet(firstname: string) {
    console.log(`Hello ${firstname}`);
}

greet("John");

function sum(a: number, b: number): number {
    return a + b;
}  
console.log(sum(10, 1));


function delayedCall(fn : (message: string) => void, delay:number) {
    setTimeout(fn, delay);
}

delayedCall(function (message="Hello") {console.log(message)}, 1000);

interface userType {
    firstname: string;
    lastname: string;
    age: number;
}

type user = {
    firstname: string;
    lastname: string;
    age: number;
}

function greetUser(user: userType) {
    console.log(`Hello ${user.firstname} ${user.lastname}`);
}

function greetUser1(user: user) {
    console.log(`Hello ${user.firstname} ${user.lastname}`);
}

interface People {
    name: string,
    age: number,
    isLegal: () => boolean
}

class Manager implements People{
    name: string;
    age: number;

    constructor(name: string, age:number) {
        this.name = name;
        this.age = age;

    }

    isLegal() {
        const legal = this.age >= 18 ? true : false;
        return legal;
    }
}

// abstract class like Interface (Blueprint)
abstract class Student {
    name: string;
    age: number;

    constructor(name: string, age:number) {
        this.name = name;
        this.age = age;

    }

    abstract greet(): void;


}

class CollegeStudent extends Student {

    constructor(name: string, age:number) {
        super(name, age);
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}


interface Person {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    address: string

}

// use of Pick
type updatePerson = Pick<Person, 'firstName' | 'lastName'>;

// partial , makes all elements of interface or type optional
type updateProps = Partial<Person>;

// Readonly

interface NewPerson {
    readonly name: string;
    readonly age: number;
};

const p: NewPerson = {
    name: "Sachin",
    age: 20
}
 // or 
 const p1: Readonly<Person> = {
    firstName: "Sac",
    lastName: "sac",
    age: 1,
    email: "abc",
    address: "xyz"
 }

p.name = "John" // type script error , can't change read only property

// Record , Record<keytype, field> (key value pairs)
type Person2 = Record<string, Person>;
const p2: Person2 = {
    "1": {
        firstName: "John",
        lastName: "Doe",
        age: 20,
        email: "abc",
        address: "xyz"
    },
    "2": {
        firstName: "John",
        lastName: "Doe",
        age: 20,
        email: "abc",
        address: "xyz"
    }
}

// Map another way to create key-value pair
const p3 = new Map<string, Person>()
// to set values
p3.set(
    "1", {
        firstName: "John",
        lastName: "Doe",
        age: 20,
        email: "abc",
        address: "xyz"
    }
)
p3.set(
    "2", {
        firstName: "Sac",
        lastName: "Bh",
        age: 20,
        email: "fdfd",
        address: "envvn"
    }
)

const p3val = p3.get("1");



