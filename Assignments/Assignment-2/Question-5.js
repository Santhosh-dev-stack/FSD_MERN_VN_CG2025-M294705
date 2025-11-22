// 5. Create an array of 5 numbers and print:
// o The sum
// o The largest number

let nums = [12, 45, 3, 98, 26];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
  sum += nums[i];
}

// let sum = nums.reduce((a, b) => a + b, 0);
console.log('Sum:', sum);

let max = Math.max(...nums);
console.log('Largest:', max);
