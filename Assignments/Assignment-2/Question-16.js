// 16. Create three functions placeOrder(callback), cookFood(callback), and
// deliverFood() using setTimeout to simulate delays. Use callbacks so the
// messages print in order: Order placed → Food cooking → Food
// delivered.

function placeOrder(callback) {
  setTimeout(() => {
    console.log('Order placed');
    callback();
  }, 1000);
}

function cookFood(callback) {
  setTimeout(() => {
    console.log('Food cooking');
    callback();
  }, 1000);
}

function deliverFood() {
  setTimeout(() => {
    console.log('Food delivered');
  }, 1000);
}


placeOrder(()=>{
  cookFood(()=>{
    deliverFood();
  })
})