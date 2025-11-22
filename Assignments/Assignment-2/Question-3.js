/*
3. Create a variable name and:
o Print "Hello, [name]! Welcome to JavaScript."
o Convert the name to uppercase
o Check if the message has more than 10 characters
o Check if it contains the word "JavaScript"

 */

// let name = prompt('Enter your name:');
let name ="Sandy"

console.log(`Hello, ${name}! Welcome to JavaScript.`);
let upperName = name.toUpperCase();
console.log('Uppercase Name:', upperName);

let message = `Hello, ${name}! Welcome to JavaScript`;

console.log('More than 10 characters?', message.length > 10);

console.log("Contains 'JavaScript'?", message.includes('JavaScript'));