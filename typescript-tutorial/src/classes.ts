/*
Chapters 6 of:
"Typescript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
by Dave Gray
https://www.youtube.com/watch?v=gieEQFIfgYc&ab_channel=DaveGray
*/

class Coder {

    name: string;
    music: string;
    age: number;
    lang: string;

    // We get an error if we set attributes without a constructor

    constructor(name: string, music: string, age: number, lang: string) {

        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;

    }

}

// Visibility (or data/access) modifiers/members make this much cleaner (more DRY)
// We define the attributes inside of the constructor, and they are automatically set as the
// constructor parameters

class Hacker {

    // We can have public, protected and private for the visibility modifiers

    constructor(
        
        // Public means people can access the attribute
        public readonly name: string,   // Readonly makes it a const 
        public music: string,    
        
        // Private means only the class itself can access the attribute (via function calls)
        private age: number,             
        
        // Protected means that only itself and children inherited from this class can access this attribute
        protected lang: string = 'TypeScript'       // Gives it a default value  
                                        

    ) {}

    secondLang!: string;        // We add the ! assertion to tell TypeScript that we will handle it correctly
                                // This would be for if, e.g., this variable must be set some time after the constructor is called

    public getAge() {
        return `Hello, I'm ${this.age}`
    }

}

const Dave = new Hacker("Dave", "Classical", 42);

// console.log(Dave.age)     // Not allowed, as age is private
// console.log(Dave.lang)    // Not allowed, as lang is protected
console.log(Dave.getAge());

// NOTE: console.log(Dave.age) is still valid JavaScript, and would still be compiled if uncommented
// This can be changed in the tsconfig to enforce code safety
// This is noEmitOnError :)

class WhiteHatHacker extends Hacker {

    constructor(
        public computer: string,
        name: string,
        music: string,
        age: number
    ) {

        // Calls the parent constructor. Must be called before anything else in the constructor
        super(name, music, age);    

    }

    public getLang() {

        return `I write ${this.lang}`;

    }

}

const Sara = new WhiteHatHacker('Linux', 'Sara', 'Lofi', 25);
console.log(Sara.getLang());

// Inherited private and protected members will still be inaccessible
// console.log(Sara.age)
// console.log(Sara.lang)

// We can use interfaces as templates for classes

interface Musician {

    name: string,
    instrument: string,

    play(action: string): string

}

class Drummer implements Musician {

    // Drummer will check against Musician to enforce specific attribute and functions,
    // and their typings

    // name: number;   // Error due to Musician 
    name: string;
    instrument: string;

    constructor(name: string, instrument: string) {

        this.name = name;
        this.instrument = instrument;

    }

    play(action: string) {

        return `${this.name} ${action} the ${this.instrument}.`;

    }

}

const Page = new Drummer('Jimmy', 'drums');
console.log(Page.play('whacks'));

// Static member attributes and functions are accessed directly by the class
// The static attribute is shared between all objects created for a class

class Peeps {

    static count: number = 0;  

    static getCount(): number {
        return Peeps.count;
    }

    public id: number;

    constructor(public name: string) {

        this.id = Peeps.count++;  // Uses the count for the ID, and increments it

    }

}

const John = new Peeps('John');
const Jesse = new Peeps('Jesse');

console.log(Peeps.getCount());      // 2
console.log(John.id);               // 0
console.log(Jesse.id);              // 1

// Now we will look at getters and setters
// A getter is a function thats sole purpose is to get values from an object
// A setter is a function thats sole purpose is to set values in an object

class Bands {

    private dataState: string[];

    constructor() {

        this.dataState = [];

    }

    public get data(): string[] {       // Set it specifically as a getter (errors if we set anything)

        return this.dataState;

    }

    public set data(value: string[]) {      // Set it specifically as a setter (errors if we return anything)

        // Checks that we put in an array, and all elements are strings

        if (Array.isArray(value) && value.every(element => typeof element === 'string')) {

            this.dataState = value;
            return;

        } else throw new Error('Parameter is not an array of strings.');

    }

}

const MyBands = new Bands();

// We see that we have made an attribute data that acts as an interface for 
// our private attribute dataState

MyBands.data = ['Twenty One Pilots', 'Fallout Boy'];
console.log(MyBands.data);

MyBands.data = [...MyBands.data, 'Glass Animals'];  // ... expands out the contents of an array
                                                    // This allows us to add to the array easily









