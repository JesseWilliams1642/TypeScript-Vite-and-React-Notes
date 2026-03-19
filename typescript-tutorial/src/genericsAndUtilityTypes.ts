/*
Chapters 8 to 9 of:
"Typescript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
by Dave Gray
https://www.youtube.com/watch?v=gieEQFIfgYc&ab_channel=DaveGray
*/

// We will look at generic statements (templates)

const echo = <T>(arg: T): T => arg;

const isObj = <T>(arg: T): boolean => {

    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)

}

console.log(isObj(true));           // False
console.log(isObj('John'));         // False
console.log(isObj({name: John}));   // True
console.log(isObj(null));           // False

const isTrue = <T>(arg: T): { arg: T, is: boolean } => {

    // Note: A non-zero number, non-empty string, 
    // non-empty array and non-empty object is true
    // All other situations are false

    // Handles non-empty arrays 

    if (Array.isArray(arg) && !arg.length) {

        return {arg, is: false};

    }

    // Handle non-empty objects

    if (isObj(arg) && !Object.keys(arg as keyof T).length) {

        return { arg, is: false };

    }

    // !! is the double-bang operator, which turns a 0 or 1 into a false or true
    // Hence, it turns strings, numbers and bools into a bool
    return {arg, is: !!arg}

}

console.log(isTrue(false));             // False
console.log(isTrue(3));                 // True
console.log(isTrue(''));                // False
console.log(isTrue('Hello World!'));    // True
console.log(isTrue([]));                // False
console.log(isTrue(["Wow!"]));          // True
console.log(isTrue({}));                // False
console.log(isTrue({Wow: false}));      // True
console.log(isTrue(null));              // False
console.log(isTrue(undefined));
console.log(isTrue(NaN));

// We could also do this using an interface

interface BoolCheck<T> {

    value: T,
    is: boolean

}

const checkBoolValue = <T>(value: T): BoolCheck<T> => {

    // Handle non-empty arrays

    if (Array.isArray(value) && !value.length) {

        return {value, is: false};

    }

    // Handle non-empty objects

    if (isObj(value) && !Object.keys(value as keyof T).length) {

        return { value, is: false };

    }

    return {value, is: !!value}     // Everything else

}

// We can extend a generic template to include attributes from an interface

interface HasID {
    id: number
}

const processUser = <T extends HasID>(user: T): T => {

    return user;

}

console.log(processUser({id: 0, user: "Jesse"}));

// We look at a more complex use of extends
// It allows us to use the type of T to create a second generic attribute, K

interface Colour {
    color: string,
    value: string
}

// keyof defines K as a key (e.g. color or value) instead of an index

const getColoursProperty = <T extends Colour, K extends keyof T>(colours: T[], key: K): T[K][] => {

    return colours.map(colours => colours[key]);

}

// The following is taken from https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html

const testArray = [
	{
		color: "red",
		value: "#f00"
	},
	{
		color: "green",
		value: "#0f0"
	},
	{
		color: "blue",
		value: "#00f"
	},
	{
		color: "cyan",
		value: "#0ff"
	},
	{
		color: "magenta",
		value: "#f0f"
	},
	{
		color: "yellow",
		value: "#ff0"
	},
	{
		color: "black",
		value: "#000"
	}
]

console.log(getColoursProperty(testArray, 'color'));

// Lastly, we will see how it is used with classes

class StateObject<T> {

    private data: T;

    constructor(value: T) {

        this.data = value;

    }

    get state(): T {

        return this.data;

    }

    set state(value: T) {     // Note: Setters do not have a return type (not even void)

        this.data = value
        return;

    }

}

const store = new StateObject("John");
console.log(store.state);
store.state = "Dave";
console.log(store.state);

//store.state = 12;    // Error! We set T = string when we created store

// We can specify more complex typing for this!
// E.g. For an array of strings, numbers and booleans, we have:
const newState = new StateObject<(string | number | boolean)[]>([15, 'Jesse', false]);

// Utility types allow us to do complex actions with types
// Firstly, the Partial utility type allows us to create a type that has all, or at least some, of the
// properties of an object

interface Assignment {

    studentId: string,
    title: string,
    grade: number,
    verified?: boolean

}

const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {

    return {...assign, ...propsToUpdate};

}

// With this, we can parse in many or just one of the properties inside of Assignment,
// letting us update it without necessarily parsing in a whole Assignment type

const assign1: Assignment = {

    studentId: "compsci123",
    title: "Final Project",
    grade: 0

}

console.log(updateAssignment(assign1, {grade: 95}));
const assignGraded: Assignment = updateAssignment(assign1, {grade: 95});

// Next, we look at the required and readonly utility types
// Required means that any properties of an object must have all of its optional values filled.

const recordAssignment = (assign: Required<Assignment>): Assignment => {
    return assign;
}

console.log(recordAssignment({...assignGraded, verified: true}));

// Readonly makes it so that we cannot change the values of the object

const assignVerified: Readonly<Assignment> = {...assignGraded, verified: true};

// The record utility type, which we have used before, defines the key and value types
// that an object can have

const hexColorMap: Record<string, string> = {

    red: "FF0000",
    green: "00FF00",
    blue: "0000FF"

}

// Records allow us to do key-value pairs using literals
// Note: All keys must be used!

type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "E";

const finalGrades: Record<Students, LetterGrades> = {

    Sara: "B",
    Kelly: "C"

}

interface Grades {

    assign1: number,
    assign2: number

}

const gradeData: Record<Students, Grades> = {

    Sara: {assign1: 85, assign2: 93},
    Kelly: {assign1: 76, assign2: 15}

}

// Next, we look at the Pick utility type
// It chooses which properties we want to use from an object

type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = {

    studentId: "k123",
    grade: 85

}

// The Omit utility type defines which properties we do not want to take
// from an object

type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview: AssignPreview = {

    studentId: "123",
    title: "Capstone Project"

}

// The Exclude utility type gives us a type without the specified key(s)
// The Extract utility type gives us a type with only the specified key(s)

type adjustedGrade = Exclude<LetterGrades, "E">;
type highGrades = Extract<LetterGrades, "A" | "B">;

// The NonNullable utility type removes null and undefined from an inputted type

type AllPossibleGrades = 'Dave' | 'John' | null | undefined;
type NamesOnly = NonNullable<AllPossibleGrades>;

// Lastly, the ReturnType utility type will let you define the return type of a function after the function is defined.

// This will automatically set it to whatever the compiler determines is the return type 
// from what has been set in the return function

const createNewAssign = (title: string, points: number) => {

    return {title,points};

}

type NewAssign = ReturnType<typeof createNewAssign>;

const tsAssign: NewAssign = createNewAssign("Utility", 100);

// The Parameters utility type also derives a type from a defined function
// It gets you the type of the parameters of a function

type AssignParams = Parameters<typeof createNewAssign>;

const assignArgs: AssignParams = ["Generics", 100];
const tsAssign2: NewAssign = createNewAssign(...assignArgs);  // Gotta spread it in, like Vegemite :)

console.log(tsAssign2);

// The Awaited utility type is a relatively new type that looks at the ReturnType of a Promise (async functions)

interface User {

    id: number,
    name: string,
    username: string,
    email: string

}

const fetchUsers = async(): Promise<User[]> => {

    const data = await fetch('https://example.com/users')
        .then(res => { return res.json(); })
        .catch(err => {

            if (err instanceof Error) console.log(err.message);

        });
    
    return data;

}

// We want the returned type, not the promise
// The ReturnType, without Awaited, will give the promise!

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>;  

//fetchUsers().then(users => console.log(users));   // Fake website, so I will not call this :)