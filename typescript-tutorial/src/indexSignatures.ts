/*
Chapters 7 of:
"Typescript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
by Dave Gray
https://www.youtube.com/watch?v=gieEQFIfgYc&ab_channel=DaveGray
*/

interface TransactionObj {

    Pizza: number,
    Books: number,
    Job: number

}

const todaysTransactions: TransactionObj = {

    Pizza: -10,
    Books: -5,
    Job: 50

}

console.log(todaysTransactions.Pizza);
console.log(todaysTransactions['Pizza']);

let prop: string = 'Pizza';
//console.log(todaysTransactions[prop]);    // Errors!

// We will look at index signatures for these kind of values.
// For the new interface below, we are now attributing each attribute of the object
// as an array of strings, which act as indexes

interface IndexedTransactionObj {

    readonly [index: string]: number;

}

const todaysTransactions2: IndexedTransactionObj = {

    Pizza: -10,
    Books: -5,
    Job: 50

}

// We can now use the attribute names to get the values! Hurray!

const todaysNet = (transactions: IndexedTransactionObj): number => {

    let total = 0;

    for (const transaction in transactions) total += transactions[transaction];
    return total;

}

console.log(todaysNet(todaysTransactions2))

// But, index signatures do not allow us to access values via .attribute anymore
// todaysTransactions2.Pizza = 40;      // Errors

// There is an issue with index signatures, as TypeScript will not know if there is a specific
// index set of not
console.log(todaysTransactions2['Dave']);       // Will not be caught, and will output unknown

// This is fixed by combining these two methods of interfaces

interface IndexedTransactionObj2 {

    readonly [index: string]: number;

    Pizza: number,
    Books: number,
    Job: number,
    Dave: number

}

// This enforces that Dave (and the other values) must have an initialised value.

// Next, we will look at how to do index signatures for multiple types, and for optional values

interface Student {

    [key: string]: string | number | number[] | undefined;

    name: string,
    GPA: number,
    classes?: number[]  // Can be number[] or undefined (due to ?)

}

// The code concern of using this with optional values is that undefined will allow undefined values
// to be called

const student: Student = {

    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]

}
console.log(student.tests);     // Returns undefined! Bad!

for (const key in student) {

    console.log(`${key}: ${student[key]}`);

}

// What if we REALLY do not want to use index signatures?
// We use the keyof assertion

interface Student2 {

    name: string,
    GPA: number,
    classes?: number[] 

}

const student2: Student2 = {

    name: "Jesse",
    GPA: 6.0,
    classes: [100, 200, 300, 400]

}

for (const key in student2) {

    console.log(`${key}: ${student2[key as keyof Student2]}`)     // Crazy!!! 

}

// If we are unsure of what the type will be, we can use typeof with keyof to do it

Object.keys(student2).map(key => {

    console.log(student[key as keyof typeof student2])

})

// On top of that, another method is to pass in the keys inside the parameters of a function!
// Things are getting crazier O_O

const logStudentKey = (student: Student2, key: keyof Student2): void => {

    console.log(`Student ${key}: ${student[key]}`)

}

logStudentKey(student2, 'GPA');

// We can use type declarations and Records to create interfaces that use literals for keys
// This must be done like this because literals cannot be used for index signatures (errors!).

// Here, we have created a record with literal keys (salary, etc) and numeric values

type Streams = 'salary' | 'bonus' | 'sidehustle';
type Incomes = Record<Streams, number>;

const monthlyIncomes: Incomes = {

    salary: 500,
    bonus: 100,
    sidehustle: 250

}

// The drawback is that we cannot choose specific typing for each key, e.g.
// type Incomes = Record<Streams, number | string>; 
// We cannot determine salary as only being a number if we use this

// We still need to use keyof assertions for this

for (const revenue in monthlyIncomes) {

    console.log(monthlyIncomes[revenue as keyof Incomes]);

}
