// 1. Write a program that takes a number and prints whether it is even/odd,
// positive/negative/zero, and whether it is divisible by both 3 and 5.

// const  num = parseInt(prompt("enter the number:"))
const num = 10;

if(num%2==0){
   console.log("its even number ");
   
}else {
  console.log("its odd number");
  
}

if(num>0){
  console.log("its positive number");
  
}else if(num<0) {
  console.log("its negative number");
  
} else {
  console.log("its zero");
  
}


if(num%3==0&&num%5==0){
  console.log("its divided by 3 and 5 numbers");
  
}else{
  console.log('its not divided by 3 and 5 numbers');
  
}