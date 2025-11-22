/*
2. Write a program that takes marks (0–100) and prints the grade
(A/B/C/F). Also take an age input and use a ternary operator to print
“Adult” or “Minor”.
*/

// let marks = Number(prompt('Enter marks (0-100):'));
let num=90;
let grade;

if(num >= 90){
   grade = 'A';
  
}
else if(num >= 75){
   grade = 'B';
  
}else if(num >=50){
   grade = 'C';
  
}else{
  grade="F";
}
console.log("Grade: ",grade);

// let age = Number(prompt('Enter your age:'));
let age = 23;
let status = age >= 18 ? 'Adult' : 'Minor';

console.log(status);