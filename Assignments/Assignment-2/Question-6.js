/*
6. A theatre booking system has: totalSeats = 120 and bookedSeats =
78. Write a program to Calculate available seats, Check if the show is
“Almost Full” if seats < 20, “Moderate Availability” if seats between 20–
60, “Plenty of Seats Available” if seats > 60. Print both the exact number
of seats left and the status message
 */

let totalSeats= 120;
let bookedSeats= 60;
let availableSeats = totalSeats-bookedSeats;
console.log("Available Seats",availableSeats);

let status = '';

if (availableSeats < 20) status = 'Almost Full';
else if (availableSeats <= 60) status = 'Moderate Availability';
else status = 'Plenty of Seats Available';

console.log('Status:', status);
