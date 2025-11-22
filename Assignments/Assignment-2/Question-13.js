// 13.Given sales [2500, 4000, 1800, 3200, 5000], print using for loop:
// Day 1: ₹2500
// Day 2: ₹4000

let sales = [2500, 4000, 1800, 3200, 5000];

for (let i = 0; i < sales.length; i++) {
  console.log(`Day ${i + 1}: ₹${sales[i]}`);
}
