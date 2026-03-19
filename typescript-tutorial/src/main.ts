/*
Chapters 1 to 5 of:
"Typescript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
by Dave Gray
https://www.youtube.com/watch?v=gieEQFIfgYc&ab_channel=DaveGray
*/

// Typescript is Javascript + types.
// It is downloaded through npm. You can still use any Javascript
// code in a Typescript file (.ts), but you should now enforce typing.
// Note: Install it globally to use important functions (e.g. tsc), so via "npm install -g typescript"

let username = "Dave";
console.log(username);

/* 
There are Typescript config functions.
In console we can put "tsc file-name" to convert the Typescript
file into a Javascript file. It will also convert it into a form that
is more compatible with older browser versions (hence older JS versions).
E.g. it will convert let --> var

We then link the Javascript file to the website instead.

Note: If both the TS and the JS files are open at the same time in VS
code then it will error. Just close one of them :))

It is better to use "tsc main.ts -w", which watches main.ts for changes and 
will automatically update main.js 

We could also, instead, create a Typescript Configuration file using
tsc --init
In the tsconfig.json file, we uncomment what attributes we need to define
and set them to our desired state

With the config file set up, we use "tsc -w" to have the config file
put into effect.

The "noEmitOnError" attribute in tsconfig stops TS --> JS if there
is an error in the TS compiler. For doing the conversion in console 
you would perform "ts --noErrorOnEmit -w".

*/
/*

Strongly typed languages are those that REQUIRE typing declarations
for variables. 

Typescript is a statically typed language, meaning types are checked at
compile time. Javascript is a dynamically typed language, meaning types are
checked at runtime.

TS allows for self-documenting and catching errors during development. 

*/

// To create types we add a ": data_type" to our variable declarations.

let skillLevel: number = 6;
let message: string = "Hello World!";
let readyToLearn: boolean;
let album: any;        // Don't use, makes you using TS invalid :P

readyToLearn = true;

// There are union types, which allows a variable be multiple
// pre-defined types

let age: string | number = "18";
age = 18;      

// Function parameters must be defined using types now

const sum = (a: number, b: number) => {
    return a+b;
}

// If you are importing something and do not know what type
// it will be, intelli-sense will let you see the type by hovering
// over it.

let re = /\w+/g;

// We see that the above expression has the type RegExp

let re2: RegExp = /\w+/g;

// Now we will look at creating arrays using datatyping
// For an array of a single type we have:
let guitars: string[] = ["Electric", "Acoustic"];

// For an array where the elements can be from multiple types, no matter
// the index, we have:
let mixedBag: (string | number | boolean)[] = ["Banana", 1000, false];

mixedBag[0] = 123;
mixedBag.push("Apple");
mixedBag.unshift(true);     // Adds element to front of array and returns
                            // the array's new size

// If we have an array where each index has its own SPECIFIC data type, we use
let orderedBag: [boolean, string, boolean] = [true, "Wooohooo!", false];

// orderedBag[0] = "First Element!";  // Does not work, will error as it can only be a bool

// Now we will define objects. Remember that arrays are actually objects as well!
// Because of this, you can set an object to any defined array (no matter its typing defined)
let myObj: object;
myObj = [];
myObj = mixedBag;

// To define your own custom object we do the following:
// We cannot explicitly set the typing for this, it will be inferred

const exampleObj = {

    attribute1: "Jesse",
    attribute2: true

}

exampleObj.attribute1 = "Kate"; // Must stay the same type

// We can create our own object types

type Guitarist = {

    name: string,
    active?: boolean,           // The ? makes this property OPTIONAL
    albums: (string | number)[]

}

let EdSheeran: Guitarist = {

    name: "Ed Sheeran",
    albums: ["Plus", "Minus", 2003]

}

// We can use this new object type for functions!

const greetGuitarist = (guitarist: Guitarist) => {

    let greeting: string = `Hello ${guitarist.name.toUpperCase()}!`;

    if (guitarist.active) {     // Must check if it is an optional attribute!!
        
        greeting += " They are ";
        greeting += guitarist.active ? " still active." : " no longer active."; 

    }

    return greeting;

}

console.log(greetGuitarist(EdSheeran));

// We can use an interface, instead of a type, when we define
// something class-like instead of an object type

interface programmer {

    name: string,
    age: number,
    goodAtProgramming: boolean

}

// Enums in JS are not a type-level addition, instead being added to the language and runtime.

enum Grade {

    F = 1,  // Starts enumeration from 1 instead of 0 
    P, 
    C, 
    H, 
    HD

}

console.log(Grade.HD);  // Would give us 5 (enumerated from 0 onwards)

// Types (type aliases) apply to more than just objects
// We can create Typescript types in however manner we want!

type stringOrNumber = string | number;
type stringOrNumberArray = (string | number)[];

type UserID = stringOrNumber; // Can set a type to use another type

// We cannot do anything like this for interfaces. Interfaces are more 
// for objects and classes, while types are for straight-forward typing

// We can set our own "Literal" types.
// The type we choose is the only value the variable can be.
let literalName: 'Dave' | 'Jesse' | 'Kate' = 'Dave';
literalName = 'Jesse';

// Going back to functions, we can supply the typing of the parameters
// and the return type

const add = (a: number, b: number): number => {

    return a+b;

}

// Functions that do not return anything would be a void return type

const logMessage = (message: any): void => {

    console.log(message);

}

logMessage("Hello!");

// We can also create functions using the function keyword; we do not add the arrow => in this case

const subtract = function (c: number, d: number): number {

    return c-d;

}

// Furthermore, there is a function type that we can define and use to define functions

type mathFunction = (a: number, b: number) => number; // Defines input and return type

let multiply: mathFunction = function(c,d) {
    return c*d;
}

// If we use an interface for the function parameters and return type, we 
// get the same output. This is good for if we extend the functionality of classes

interface mathFunction2 {

    (a: number, b: number): number;

}  

// Some functions may have optional parameters. 

const addAll = (a: number, b: number, c?: number): number => {

    if (typeof(c) !== 'undefined') {        // Must check that the optional param is set
        return a+b+c;
    }
    return a+b;

}

// We can also have default values :D

const subtractAll = (a: number = 10, b: number, c: number = 3): number => {

    return a - b - c;

}

console.log(subtractAll(undefined, 4));    // 10 - 4 - 3 = 3

// Rest parameters allow us to define an unknown number of elements
// A.k.a. It is the 'rest of the parameters

const total = (name: string, ...nums: number[]): number => {

    console.log(`${name} has the the following total: `);
    return nums.reduce((prev, curr) => prev + curr);

}

console.log(total("Jesse", 1, 4, 6, 3, 2));

// We can create errors using Typescript. Functions that throw errors have
// the "never" return type

const createError = (errMsg: string): never => {

    throw new Error(errMsg);

}

// If we have a function that has an endless loop, then it would
// also be a never type

// For a function that takes either a string or number, we can do the following:

const numberOrString = (value: number | string): string => {

    if (typeof(value) === 'string') return 'string';
    if (typeof(value) === 'number') return 'number';

    return createError('This should never happen.');

}

// Typescript actually enforces you to create an error checker if your type
// guards do not work!

// Another fun way to define variables if the following:
let d = <number>100;

// We do not use this because it does not work in TSX files (e.g. for React).

// Type casting/assertions is transforming one type to another

type typeOne = string;
type typeTwo = string | number;
type typeThree = 'hello';

let a: typeOne = 'hello';
let b = a as typeTwo;       // Casting to other types
let c = a as typeThree;

// We will create a fun function that adds two numbers (string or number type) together:

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string => {

    if (c === 'add') return a+b;
    return '' + a + b;

}

// If we know that the result will be a string, we must assert that it will be a string
// That is because addOrConcat can return a number or string, which Typescript does not like
// without an assertion used.

let myVal: string = addOrConcat(2, 2, 'concat') as string;

// BE CAREFUL THOUGH! TYPESCRIPT SEES NO PROBLEM HERE BUT A STRING WILL BE RETURNED...
// Assertions has Typescript believe that the coder has made no mistakes (they still could!)
let nextVal: number = addOrConcat(2, 2, 'concat') as number;

// Force casting (a.k.a. double casting) is where we overrule Typescript to cast between two casts
// Avoid doing it though :)

//10 as string  // TS error
(10 as unknown) as string

// The Document Object Model (DOM) 
const element1: HTMLElement | null = document.getElementById('ID');
const element2: HTMLElement | null = document.getElementById('#ID');

const element3: Element | null = document.querySelector('element');    // Only Element, as it does not know what 'element' is

const img: HTMLImageElement | null = document.querySelector('img') as HTMLImageElement;  
const img2: HTMLImageElement | null = document.querySelector('img')!;       // ! tells Typescript that it will never be null      
                                                                            // (unless we make a mistake :P)

const imgID = document.getElementById('#img') as HTMLImageElement;

//img.src = "./img/img1.png";         // Without the assertion, we would get errors for if this was null

//imgID.src = "./img/img2.png";       // Similarly, we get the null issue which would require assertion to HTMLElement
                                      // But, we then get an error for .src not being in HTMLElement!
                                      // Hence, we assert it to HTMLImageElement without any initial type declaration (else more errors)

/*

Refer to copyright.ts for an example of using this

*/









